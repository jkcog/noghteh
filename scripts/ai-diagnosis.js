import fs from 'node:fs';
import { execSync } from 'node:child_process';
import process from 'node:process';

const errorLog = fs.readFileSync('error.log', 'utf8');

const prompt = `
A CI/CD test or build step just failed. 
Analyse the stack trace. Provide a UNIFIED DIFF to fix the issue.
ERROR: ${errorLog}

STRICT RULES:
1. ONLY change lines that are necessary to fix the error.
2. Do NOT change formatting, spacing, or unrelated code.
3. If the test (e.g., 1+1=3) is the problem, change the test expectation to 2.
4. Output MUST be a valid JSON object.

 You MUST respond with ONLY a valid JSON object in this format:
{
  "filePath": "valid filename",
  "diff": "valid unified diff"
}
`;

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
              'You are a precision code-patching tool. You only output unified diffs in JSON format.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0,
        response_format: { type: 'json_object' },
      }),
    },
  );

  const data = await response.json();
  const { filePath, diff } = JSON.parse(data.choices[0].message.content);

  fs.writeFileSync('fix.patch', diff.trim() + '\n\n');

  console.log(`Applying precision patch to ${filePath}...`);
  execSync(
    `git apply --recount --whitespace=fix --ignore-space-change fix.patch`,
  );

  console.log('✅ Patch applied successfully!');
} catch (err) {
  console.error('❌ Fix failed:', err.message);
  process.exit(1);
}
