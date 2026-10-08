require('dotenv').config();

const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function extractJson(text) {
  const cleaned = text
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim();

  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');

  if (start === -1 || end === -1) {
    throw new Error('AI did not return valid JSON');
  }

  return JSON.parse(cleaned.slice(start, end + 1));
}

async function generateDailyChallenge() {
  const prompt = `
Create today's LearnTV Daily Challenge.

Use current educational topics and recent reliable information from the web.

Audience:
Family-friendly learners.

Topics:
Science, Space, Technology, Geography, History, Global GK,
Environment and major educational discoveries.

Create exactly 10 multiple-choice questions.

Rules:
- Every question must have exactly 4 options.
- Exactly one option is correct.
- Include the correct answer as a zero-based index.
- Include a short educational explanation.
- Avoid politics, violence, adult topics and controversial material.
- Avoid rumors and unverified claims.
- Prefer stable educational facts when recent information is uncertain.
- Do not repeat obvious questions such as "What is the Red Planet?"
- Questions should be suitable for a family learning TV app.

Return ONLY valid JSON in this format:

{
  "date": "YYYY-MM-DD",
  "title": "Today's Daily Challenge",
  "questions": [
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "answer": 0,
      "explanation": "..."
    }
  ]
}
`;

  const response = await client.responses.create({
    model: 'gpt-6-luna',
    tools: [
      {
        type: 'web_search',
      },
    ],
    input: prompt,
  });

  return extractJson(response.output_text);
}

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    service: 'LearnTV Daily Challenge AI',
  });
});

app.get('/daily-challenge/generate', async (req, res) => {
  try {
    const challenge = await generateDailyChallenge();

    res.json({
      success: true,
      challenge,
    });
  } catch (error) {
    console.error('AI ERROR:', error);

    res.status(500).json({
      success: false,
      error: 'Daily challenge generation failed',
    });
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(
    `LearnTV Daily Challenge AI running on port ${port}`,
  );
});
