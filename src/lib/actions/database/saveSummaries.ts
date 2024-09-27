'use server';
import { ref, set, serverTimestamp } from 'firebase/database';
import { getRTDatabase } from '@/lib/firebase/serverDb';
import { ChapterSummary } from '@/lib/definitions';

export const saveInitialSummary = async (novelId: string): Promise<void> => {
  try {
    if (!novelId || typeof novelId !== 'string') {
      throw new Error('Invalid novelId provided');
    }

    const db = await getRTDatabase();

    await set(ref(db, `novels/content/summaries/${novelId}`), {
      novelId: novelId,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error saving initial summary object:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Error saving initial summary: ${errorMessage}`);
  }
};

export const saveSummaries = async (
  chapterSummary: ChapterSummary,
  novelId: string
) => {
  const db = await getRTDatabase();

  try {
    await set(
      ref(
        db,
        `novels/content/summaries/${novelId}/summaries/${chapterSummary.chapterId}`
      ),
      chapterSummary
    );
  } catch (error) {
    console.error('Error saving chapter summaries:', error);
    throw new Error('Error saving chapter summaries');
  }
};
