'use server';
import getNovel from '@/lib/actions/getNovel';
import { callsummaryFlow } from '@/lib/actions/genkit/summarizeNovel';

type Chapter = {
  [key: string]: string;
};
type Novel = {
  chapters: Chapter;
  name: string;
  id: string;
};

type Summary = {
  [key: string]: string;
};

interface state {
  message: string;
  summaries?: Array<{chapter: string, summary: string}>; 
}

export default async function getChapterSummaries(
  state: state,
  formData: FormData
) {
  const id = formData.get('novelId') as string;
  const novelName = formData.get('novelName') as string;

  try {
    const novel = (await getNovel(id, novelName)) as Novel;
    const summaries = await getChapterSummariesFromNovel(novel);
    const summaryArr = Object.keys(summaries).map((key: string) => {
      return { chapter: key, summary: summaries[key as keyof Summary] };
    });
    return { message: 'success', summaries: summaryArr };
  } catch (error) {
    console.error('error in getChapterSummaries', error);
    return { message: 'error in getChapterSummaries' };
  }
}

async function getChapterSummariesFromNovel(novel: Novel) {
  const summaries = {} as Summary;
  for (const key in novel['chapters']) {
    try {
      const text = novel['chapters'][key as keyof Novel];
      const summary = await callsummaryFlow(text);
      summaries[key as any] = summary.summary;
    } catch (error) {
      console.error('error in getChapterSummariesFromNovel', error);
    }

    // rate limit is 5 requests per minute
    await new Promise((resolve) => setTimeout(resolve, 12000));
  }
  return summaries;
}
