import { Dictionary, NovelName } from '@/lib/definitions';
import { getNames } from '@/lib/actions/database/getNames';

async function getNovelName(id: string): Promise<string | undefined> {
  try {
    if (!id) {
      throw new Error('Novel id is null or undefined.');
    }

    const novelNames: Dictionary<NovelName> | undefined = await getNames();
    const novelName = novelNames && novelNames[id]?.name;
    return novelName && novelName;
  } catch (error) {
    console.error('error in getNovelName', error);
    return undefined;
  }
}

export default getNovelName;
