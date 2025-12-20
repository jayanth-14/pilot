import { GoogleGenAI } from "npm:@google/genai";

export async function callGemini({
  apiKey,
  model,
  prompt,
  generationConfig = {},
  retries = 5,
}) {
  const client = new GoogleGenAI({ apiKey });
  let delay = 500;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await client.models.generateContent({
        model,
        contents: prompt,
        generationConfig,
      });

      const text = result?.candidates?.[0]?.content?.parts
        ?.map(p => p.text ?? "")
        .join("")
        .trim();

      if (!text) {
        throw new Error("Gemini returned empty output");
      }

      return text;
    } catch (err) {
      const msg = String(err?.message ?? err);
      if (msg.includes("503") && attempt < retries) {
        await setTimeout(delay);
        delay *= 2;
      } else {
        throw err;
      }
    }
  }

  throw new Error("Gemini failed after retries");
}

