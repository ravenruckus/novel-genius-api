'use server';
import {
  ref,
  set,
  serverTimestamp,
  child,
  get,
  DatabaseReference,
} from 'firebase/database';
import { getRTDatabase } from '@/lib/firebase/serverDb';
import { splitChapters } from '@/lib/utils/text-to-json';
import { Novel } from '@/lib/definitions';

const getNovelTextDB = async (novelId: string) => {
  // check if novel is in database
  try {
    const db = await getRTDatabase();
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `novels/novel-text/${novelId}`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      console.log('Novel text not found');
      return undefined;
    }
  } catch (error) {
    console.error('Error fetching novel text:', error);
    throw error;
  }
};

const getNovelTextGutenberg = async (
  novelId: string,
  novelName: string
): Promise<Novel> => {
  try {
    const response = await fetch(
      `https://www.gutenberg.org/files/${novelId}/${novelId}-0.txt`
    );
    const text = await response.text();
    const splitChaptersJson = splitChapters(text, novelId, novelName);
    return splitChaptersJson;
  } catch (error) {
    console.error('Error fetching novel text from Gutenberg:', error);
    throw new Error('Error fetching novel text from Gutenberg');
  }
};

const saveNovelTextDB = async (
  novelId: string,
  novelName: string,
  novelText: Novel
) => {
  try {
    const db = await getRTDatabase();
    await set(ref(db, `novels/novel-text/${novelId}`), {
      id: novelId,
      name: novelName,
      chapters: novelText.chapters,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error saving novel text:', error);
    throw new Error('Error saving novel text');
  }
};

export const getNovelText = async (novelId: string, novelName: string) => {
  if (!novelId) {
    throw new Error('No novel ID provided');
  }
  try {
    const novelText = await getNovelTextDB(novelId);
    if (novelText) {
      return novelText;
    } else {
      const text: Novel = await getNovelTextGutenberg(novelId, novelName);
      await saveNovelTextDB(novelId, novelName, text);
      return text;
    }
  } catch (error) {
    console.error('Error getting novel text:', error);
    throw new Error('Error getting novel text');
  }
};
