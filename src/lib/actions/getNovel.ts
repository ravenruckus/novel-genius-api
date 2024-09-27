'use server';
import { splitChapters } from '@/lib/utils/text-to-json';
// Validate data and add to database
export const getNovel = async (novelId: string, novelName: string) => {
  const response =
    novelId &&
    (await fetch(
      `https://www.gutenberg.org/files/${novelId}/${novelId}-0.txt`,
      { cache: 'force-cache' }
    ));
  const text = response && (await response.text());
  const splitChaptersJson = splitChapters(text, novelId, novelName);

  return splitChaptersJson || 'No novel found';
};

export default getNovel;
