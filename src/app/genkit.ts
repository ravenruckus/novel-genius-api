"use server"

import { generate } from '@genkit-ai/ai';
import { configureGenkit } from '@genkit-ai/core';
import { defineFlow, runFlow } from '@genkit-ai/flow';
import { gemini15Pro } from '@genkit-ai/vertexai';
// import { geminiPro } from '@genkit-ai/vertexai';
import * as z from 'zod';
import { vertexAI } from '@genkit-ai/vertexai';

configureGenkit({
  plugins: [
    vertexAI({ location: 'us-central1' }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

const menuSuggestionFlow = defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (subject) => {
    const llmResponse = await generate({
      prompt: `Suggest an item for the menu of a ${subject} themed restaurant`,
      model: gemini15Pro,
      config: {
        temperature: 1,
      },
    });

    return llmResponse.text();
  }
);

export async function callMenuSuggestionFlow(theme: string) {
  const flowResponse = await runFlow(menuSuggestionFlow, theme);
  console.log(flowResponse);
  return flowResponse;
}