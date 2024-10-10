'use server';
import { ref, set, serverTimestamp } from 'firebase/database';
import { getRTDatabase } from '@/lib/firebase/serverDb';
import { StagesData } from '@/lib/definitions';

export const saveStages = async (stages: StagesData, novelId: string) => {
  try {
    const db = await getRTDatabase();

    await set(ref(db, `novels/content/stages/${novelId}`), {
      novelId,
      stages: stages.stages,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error saving chapter summaries:', error);
    throw new Error('Error saving chapter summaries');
  }
};
