'use server';

import { configureGenkit } from '@genkit-ai/core';
import { defineFlow, runFlow } from '@genkit-ai/flow';
import * as z from 'zod';
import { vertexAI } from '@genkit-ai/vertexai';
import { dotprompt, prompt } from '@genkit-ai/dotprompt';
import { retry } from '@/lib/utils/retry';

// Configuration
configureGenkit({
  plugins: [vertexAI({ location: 'us-central1' }), dotprompt()],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

const summaryOutputSchema = z.object({
  summary: z.string(),
});

const summarizeFlow = defineFlow(
  {
    name: 'summarizeFlow',
    inputSchema: z.string(),
    outputSchema: summaryOutputSchema,
  },
  async (chapterText) => {
    const summaryPrompt = await prompt('summary');

    const llmResponse = await summaryPrompt.generate({
      input: { chapterText },
    });

    const output = summaryOutputSchema.parse(llmResponse.output());
    return output;
  }
);

export async function callSummaryFlow(chapterText: string, retries = 3) {
  return retry(() => runFlow(summarizeFlow, chapterText), retries);
}
