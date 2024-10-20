'use server';
import Bottleneck from 'bottleneck';
import { callSummaryFlow } from '@/lib/actions/genkit/summarizeNovel';
import { Novel, ChapterSummary } from '@/lib/definitions';
import {
  saveInitialSummary,
  saveSummaries,
} from '@/lib/actions/database/saveSummaries';
import { getNovelText } from '@/lib/actions/database/getNovelText';

interface state {
  message: string;
}

const limiter = new Bottleneck({
  minTime: 12000,
  maxConcurrent: 1,
});

export default async function getChapterSummaries(
  state: state,
  formData: FormData
) {
  const id = formData.get('novelId');
  const novelName = formData.get('novelName');

  if (typeof id !== 'string' || typeof novelName !== 'string') {
    console.log('Error with typeof id or novelName');
    return { message: 'Error getting novels' };
  }

  const novel: Novel = await getNovelText(id, novelName);

  if (!novel) {
    return { message: 'Error getting novel' };
  }

  const summaryCalls = await getChapterSummariesFromNovel(novel);

  if (!summaryCalls) {
    return { message: summaryCalls };
  } else {
    // to do: look into handling this error better.
    return { message: 'There was an error in getting the chapter summaries' };
  }
}

async function getChapterSummariesFromNovel(novel: Novel): Promise<string> {
  try {
    await saveInitialSummary(novel.id);
  } catch (error) {
    console.error('Error saving initial summary object:', error);
    return 'Error saving initial summary object';
  }

  let errorCount = 0;
  const maxErrors = 4;
  let stopProcessing = false;

  function incrementErrorCount() {
    errorCount++;
    if (errorCount >= maxErrors) {
      stopProcessing = true;
    }
  }

  for (const chapter of Object.values(novel.chapters)) {
    if (stopProcessing) break;

    const { content: chapterText, chapterId, chapterTitle } = chapter;

    if (typeof chapterText !== 'string') {
      incrementErrorCount();
      continue;
    }

    try {
      const summary = await limiter.schedule(() =>
        callSummaryFlow(chapterText)
      );
      const summaryText: string = summary.summary;
      const chapterSummary: ChapterSummary = {
        chapterId,
        chapterTitle,
        summary: summaryText,
      };
      await saveSummaries(chapterSummary, novel.id);
    } catch (error) {
      handleError(chapterId, error);
      incrementErrorCount();
    }
  }

  if (errorCount >= maxErrors) {
    return `Error: ${errorCount} chapters failed to process.`;
  }

  return 'success';
}

function handleError(chapterId: string, error: any) {
  console.error(`Error processing chapter ${chapterId}:`, error);
}
