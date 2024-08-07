import getNovel from '@/lib/actions/getNovel';
import { getNames } from '@/lib/actions/database/getNames';
export default async function Chapter({
  params,
}: {
  params: { id: string; chapter: string };
}) {
  const id = params.id;
  const chapter = params.chapter;
  const novelNames = (await getNames()) as Record<string, any>;
  const novelName = novelNames[id]?.name;
  const novel = await getNovel(id, novelName);
  const chapterContent = novel['chapters'][chapter];

  return (
    <div>
      <h1>
        Novel: {novelName} Chapter: {chapter}
      </h1>
      <p>id: {id}</p>
      <p>{chapterContent && chapterContent}</p>
    </div>
  );
}
