'use server';
import { ref, child, get, DatabaseReference } from 'firebase/database';
import { Dictionary, NovelName } from '@/lib/definitions';
import { getRTDatabase } from '@/lib/firebase/serverDb';

export const getNames = async (): Promise<
  Dictionary<NovelName> | undefined
> => {
  try {
    const db = await getRTDatabase();
    const dbRef: DatabaseReference = ref(db);
    const snapshot = await get(child(dbRef, 'novels/names'));
    if (snapshot.exists()) {
      const data: Dictionary<NovelName> = snapshot.val();
      return data;
    } else {
      console.error('No data available');
      return undefined;
    }
  } catch (error) {
    console.error('Error fetching names:', error);
    throw error;
  }
};
