export default function DisplayChapterData({
  chapterData,
  showSummary,
  showStage,
}: any) {
  return (
    <article
      key={chapterData.chapterId}
      className="mb-12 flex max-w-4xl flex-col items-start justify-between"
    >
      <div className="flex items-center gap-x-4 text-xs">
        <div className="text-gray-500">Chapter-ID: {chapterData.chapterId}</div>
      </div>

      {showSummary && (
        <div className="group relative mt-4">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <a href="#">
              <span className="absolute inset-0" />
              Title - {chapterData.chapterTitle}
            </a>
          </h3>
          <p className="mt-3 text-sm italic text-gray-600"> Summary:</p>
          <p className="mt-1 leading-6 text-gray-600">{chapterData.summary}</p>
        </div>
      )}

      {showStage && (
        <div className="group relative mt-3">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <span className="absolute inset-0" />
            Stage - {chapterData.stage}
          </h3>
          <p className="mt-3 text-sm italic text-gray-600">
            {' '}
            Explanation of chosen stage:
          </p>
          <p className="mt-1 leading-6 text-gray-600">
            {' '}
            {chapterData.stageExplanation}
          </p>
        </div>
      )}
    </article>
  );
}
