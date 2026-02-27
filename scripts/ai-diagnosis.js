import fs from 'node:fs';
import process from 'node:process';

const errorLog = fs.readFileSync('error.log', 'utf8');

const prompt = `
A CI/CD test or build step just failed. Provide a JSON object with search/replace blocks to fix the issue.
ERROR LOG:
${errorLog}

TASK:
1. Diagnose the root cause.
2. Decide if the TEST is wrong (illogical expectations) or the CODE is wrong.
3. Provide a list of specific replacements.

RULES:
- Do NOT delete unrelated code.
- ONLY change lines that are necessary to fix the error.
- Ensure the 'search' block is long enough to be unique (3-5 lines).
- Provide a 'reasoning' for each fix.
- Output MUST be a valid RAW JSON object.

Response Format:
{
  "fixes": [
    {
      "filePath": "src/logic.js",
      "reasoning": "Fixed the calculation logic which was returning undefined.",
      "search": "const result = a + b;\\n  return;",
      "replace": "const result = a + b;\\n  return result;"
    },
    {
      "filePath": "src/logic.test.js",
      "reasoning": "Adjusted test expectation to match correct mathematical output.",
      "search": "expect(sum(2, 2)).toBe(5);",
      "replace": "expect(sum(2, 2)).toBe(4);"
    }
  ]
}
`;

async function runSelfHeal() {
  console.log('🤖 Analyzing failure and generating surgical fixes...');

  try {
    const response = await fetch(
      'https://models.github.ai/inference/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GH_TOKEN}`,
        },
        body: JSON.stringify({
          model: 'openai/gpt-4.1',
          messages: [
            {
              role: 'system',
              content:
                'You are a precision code-fixing tool. You output only valid JSON with search/replace blocks.',
            },
            { role: 'user', content: prompt },
          ],
          temperature: 0,
          response_format: { type: 'json_object' },
        }),
      },
    );

    const data = await response.json();
    const { fixes } = JSON.parse(data.choices[0].message.content);

    if (!fixes || fixes.length === 0) {
      console.log(
        "🤷 AI couldn't find a confident fix. Manual intervention required.",
      );
      process.exit(1);
    }

    let prDescription =
      "## 🤖 AI Automated Report\n\nI've detected a failure and applied the following fixes:\n\n";

    for (const fix of fixes) {
      console.log(`🛠 Applying fix to ${fix.filePath}: ${fix.reasoning}`);

      let content = fs.readFileSync(fix.filePath, 'utf8');

      if (content.includes(fix.search)) {
        content = content.replace(fix.search, fix.replace);
        fs.writeFileSync(fix.filePath, content);
        prDescription += `- **Fixed ${fix.filePath}**: ${fix.reasoning}\n`;
      } else {
        console.warn(
          `⚠️ Could not find search block in ${fix.filePath}. Skipping this fix.`,
        );
      }
    }

    fs.writeFileSync('pr_body.txt', prDescription);
    console.log('✅ All applicable fixes applied.');
  } catch (err) {
    console.error('❌ Critical Failure in Self-Healing:', err.message);
    process.exit(1);
  }
}

runSelfHeal();
