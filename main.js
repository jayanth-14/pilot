#!/usr/bin/env -S deno run -A

import { requireEnv } from "./utils/env.js";
import { callGemini } from "./ai/geminiClient.js";
import { buildSystemPrompt } from "./ai/promptBuilder.js";
import { runShell } from "./exec/shell.js";

async function main() {
  const apiKey = requireEnv("GEMINI_API_KEY");
  const userPrompt = Deno.args.join(" ");

  if (!userPrompt) {
    console.error('Usage: pilot "<task description>"');
    Deno.exit(1); 
  }

  const systemPrompt = buildSystemPrompt(userPrompt);

  const output = await callGemini({
    apiKey,
    model: "gemini-2.5-flash",
    prompt: systemPrompt,
    generationConfig: { temperature: 0 },
  });

  console.log("=== Gemini Output ===");
  console.log(output);
  console.log("=====================");

  runShell(output);
}

try {
  main()
} catch(err) {
  console.error(err);
  Deno.exit(1);
};

