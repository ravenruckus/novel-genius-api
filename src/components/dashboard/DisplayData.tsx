import useGetData from '@/lib/hooks/useGetData';
import { ChapterSummary, ChapterStage } from '@/lib/definitions';
import DisplayChapterData from './DisplayChapterData';

export default function DisplayData({
  novelId,
  showStage,
  showSummary,
}: {
  novelId: string;
  showStage: boolean;
  showSummary: boolean;
}) {
  const { data: summaries, error: summaryError } = useGetData<ChapterSummary>(
    `novels/content/summaries/${novelId}/summaries`
  );
  const { data: stages, error: stagesError } = useGetData<ChapterStage>(
    `novels/content/stages/${novelId}/stages`
  );

  const mergedArray = summaries.map((summary) => {
    const matchingExplanation = stages.find(
      (stage) => stage.chapterId === summary.chapterId
    );
    return { ...summary, ...matchingExplanation };
  });

  return (
    <div>
      {mergedArray.map((chapter) => (
        <DisplayChapterData
          key={chapter.chapterId}
          chapterData={chapter}
          showSummary={showSummary}
          showStage={showStage}
        />
      ))}
    </div>
  );
}
