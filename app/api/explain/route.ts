import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text = body.text;
    const tone = body.tone;
    const level = body.level;

    const prompt = `
You are an explanation assistant.

Task:
Explain the topic in a way that is easy to understand.

Topic:
${text}

Tone:
${tone}

Audience:
${level}

IMPORTANT LANGUAGE RULE:
- Detect the language used in the user's topic
- Reply in the SAME language as the user's input
- Do not translate unless explicitly asked

Return your response in this exact JSON format:
{
  "result": "main explanation here",
  "analogy": "easy analogy here"
}

Rules:
- Keep it concise but clear
- Make the explanation easy to read
- The analogy must be simple
- Do not include markdown fences
- Do not include extra keys
`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
    });

    const raw =
      completion.choices[0]?.message?.content || '{"result":"No response generated.","analogy":""}';

    let parsed: { result?: string; analogy?: string };

    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = {
        result: raw,
        analogy: "",
      };
    }

    return Response.json({
      result: parsed.result || "",
      analogy: parsed.analogy || "",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}