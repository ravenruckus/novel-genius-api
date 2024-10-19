'use server';
import { Dictionary, StagesData } from '@/lib/definitions';
import { callAssignJourneyFlow } from './genkit/assignHeroJournies';
import { saveStages } from '@/lib/actions/database/saveStages';

interface state {
  message: string;
}

export default async function assignHeroJournies(
  state: state,
  formData: FormData
) {
  const summaries = formData.get('summaries');
  const novelId = formData.get('novelId');

  if (
    !summaries ||
    typeof summaries !== 'string' ||
    !novelId ||
    typeof novelId !== 'string'
  ) {
    return { message: 'Error getting summaries' };
  }

  try {
    const heroJourneyCalls: StagesData = await callAssignJourneyFlow(summaries);
    await saveStages(heroJourneyCalls, novelId);
  } catch (error) {
    console.error('Error calling hero journey flow', error);
    return { message: 'Error calling hero journey flow' };
  }

  return { message: 'success' };
}
