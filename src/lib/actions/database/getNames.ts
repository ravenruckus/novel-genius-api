'use server';
import { Dictionary, NovelName } from '@/lib/definitions';
import { getAuthenticatedAppForUser } from '@/lib/firebase/serverApp';

export const getNames = async (): Promise<
  Dictionary<NovelName> | undefined
> => {
  const { idToken } = await getAuthenticatedAppForUser();

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL +
        '/novels/names.json?auth=' +
        idToken
    );
    const names = await response.json();
    return names;
  } catch (error) {
    console.error('Error fetching names:', error);
    return undefined;
  }
};
