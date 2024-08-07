'use server';

import { generate } from '@genkit-ai/ai';
import { action, configureGenkit } from '@genkit-ai/core';
import { defineFlow, runFlow } from '@genkit-ai/flow';
import { gemini15Pro, gemini15ProPreview } from '@genkit-ai/vertexai';
import * as z from 'zod';
import { vertexAI } from '@genkit-ai/vertexai';
import { dotprompt, prompt } from '@genkit-ai/dotprompt';

configureGenkit({
  plugins: [vertexAI({ location: 'us-central1' }), dotprompt()],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

const summarizeFlow = defineFlow(
  {
    name: 'summarizeFlow',
    inputSchema: z.string(),
    outputSchema: z.object({
      summary: z.string(),
    }),
  },
  async (chapterText) => {
    const summaryPrompt = await prompt('summary');

    const llmResponse = await summaryPrompt.generate({
      input: {
        chapterText: chapterText,
      },
    });

    const output = llmResponse.output() as { summary: string };
    if (typeof output.summary !== 'string') {
      throw new Error('Invalid response format');
    }

    return output;
  }
);

export async function callsummaryFlow(chapterText: string) {
  const flowResponse = await runFlow(summarizeFlow, chapterText);
  return flowResponse;
}
