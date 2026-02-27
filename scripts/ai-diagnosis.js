import fs from 'node:fs';
import process from 'node:process';

const diagnose = async () => {
  let errorLog;
  try {
    errorLog = fs.readFileSync('error.log', 'utf8');
  } catch {
    console.error(
      'Could not read error.log. Exiting auto-diagnosis process...',
    );
    process.exit(1);
  }

  const prompt = `
    The following CI/CD test or build step just failed. 
    Analyse the stack trace, identify the specific file that caused the error, and provide the entire corrected file content.
    
    ERROR LOG:
    ${errorLog}
    
    You MUST respond with ONLY a valid JSON object in this exact format:
    {
      "filePath": "path/to/the/broken/file.js",
      "newContent": "// the full corrected code goes here"
    }
  `;

  console.log('🤖 Asking openai/gpt-4.1 for a fix via GitHub Models...');

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
              'You are an automated debugging system. You output ONLY valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' },
      }),
    },
  );

  if (!response.ok) {
    const errText = await response.text();
    console.error(
      `❌ GitHub Models API Error: ${response.status} - ${errText}`,
    );
    process.exit(1);
  }

  const data = await response.json();
  const aiResponseText = data.choices[0].message.content;

  try {
    const fixData = JSON.parse(aiResponseText.trim());

    if (!fixData.filePath || !fixData.newContent) {
      throw new Error('Missing filePath or newContent in AI response.');
    }

    fs.writeFileSync(fixData.filePath, fixData.newContent, 'utf8');
    console.log(`✅ Successfully applied fix to ${fixData.filePath}`);
  } catch (err) {
    console.error('❌ Failed to parse AI response or write file.', err);
    console.error('Raw AI Output:', aiResponseText);
    process.exit(1);
  }
};

diagnose();
