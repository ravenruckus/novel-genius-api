import getNovelName from '@/lib/utils/getNovelName';
import { Novel, ChapterContent } from '@/lib/definitions';
import { getNovelText } from '@/lib/actions/database/getNovelText';

export default async function Chapter({
  params,
}: {
  params: { id: string; chapter: string };
}) {
  const id = params.id;
  const chapter = params.chapter;
  const novelName = await getNovelName(id);

  let novel: Novel | undefined;
  if (novelName) {
    novel = await getNovelText(id, novelName);
  }

  let chapterContent: ChapterContent | undefined;
  if (novel) {
    chapterContent = novel['chapters'][chapter];
  }

  return (
    <div>
      <h1>
        Novel: {novelName} Chapter: {chapter}
      </h1>
      <p>id: {id}</p>
      <p>{chapterContent && chapterContent.content}</p>
    </div>
  );
}
