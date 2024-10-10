'use server';

import { configureGenkit } from '@genkit-ai/core';
import { defineFlow, runFlow } from '@genkit-ai/flow';
import * as z from 'zod';
import { vertexAI } from '@genkit-ai/vertexai';
import { dotprompt, prompt } from '@genkit-ai/dotprompt';
import { retry } from '@/lib/utils/retry';
import { getHeroJourneyStages } from '@/lib/data/herojourneystages';

function getOutput(llmResponse: any) {
  try {
    const output = llmResponse.output();
    return output;
  } catch (error) {
    console.error('error getting output', error);
    throw new Error('Error getting output');
  }
}

// Configuration
configureGenkit({
  plugins: [vertexAI({ location: 'us-central1' }), dotprompt()],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

const assignedJourneyStageSchema = z.object({
  chapterId: z.string(),
  chapterTitle: z.string(),
  stage: z.string(),
  stageExplanation: z.string(),
});

const assignedJourniesSchema = z.array(assignedJourneyStageSchema);

const heroJourneyOutputSchema = z.object({
  stages: assignedJourniesSchema,
});

const heroJourneyInputSchema = z.object({
  summariesString: z.string(),
  heroJourneyStages: z.string(),
});

const assignJourneyFlow = defineFlow(
  {
    name: 'journeyFlow',
    inputSchema: heroJourneyInputSchema,
    outputSchema: heroJourneyOutputSchema,
  },
  async ({ summariesString, heroJourneyStages }) => {
    const heroJourneyPrompt = await prompt('herosjourney');

    const llmResponse = await heroJourneyPrompt.generate({
      input: { summariesString, heroJourneyStages },
    });

    try {
      const response = getOutput(llmResponse);
      const parsedOutput = heroJourneyOutputSchema.parse(response);
      return parsedOutput;
    } catch (error) {
      console.error('Error parsing output:', error);
      throw new Error('Error parsing output');
    }
  }
);

export async function callAssignJourneyFlow(
  summariesString: string,
  retries = 3
) {
  const heroJourneyStages = JSON.stringify(getHeroJourneyStages());
  return retry(
    () => runFlow(assignJourneyFlow, { summariesString, heroJourneyStages }),
    retries
  );
}
