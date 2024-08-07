'use server';
import { NovelName } from '@/lib/definitions';

export const getNames = async (): Promise<
  Record<string, NovelName> | undefined
> => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL + '/novels/names.json',
      { next: { revalidate: 3600 } }
    );
    const names = await response.json();
    return names;
  } catch (error) {
    console.error('Error fetching names:', error);
    return undefined;
  }
};
