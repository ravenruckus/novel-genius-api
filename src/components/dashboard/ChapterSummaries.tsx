'use client';
import { useFormState } from 'react-dom';
import { formatDistanceToNow } from 'date-fns';
import { ref, onValue, off } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '@/lib/firebase/clientApp';
import getChapterSummaries from '@/lib/actions/getChapterSummaries';
import StepContentHeader from '@/components/dashboard/steps/StepContentHeader';
import { Dictionary, ChapterSummary } from '@/lib/definitions';

const initialState = {
  message: '',
};

function displayTimeAgo(timestamp: string): string {
  const date = new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true });
}

export default function ChapterSummaries({
  novelId,
  novelName,
}: {
  novelId: string;
  novelName: string | undefined;
}) {
  const [state, formAction] = useFormState(getChapterSummaries, initialState);
  const [summaries, setSummaries] = useState<Array<ChapterSummary> | []>([]);
  const [timestamp, setTimestamp] = useState<string>('');

  useEffect(() => {
    const summariesData = ref(
      database,
      `novels/content/summaries/${novelId}/summaries`
    );
    const unsubscribe = onValue(
      summariesData,
      (snapshot) => {
        const data: Dictionary<ChapterSummary> = snapshot.val();
        if (data) {
          const summariesArr: Array<ChapterSummary> = Object.keys(data).map(
            (key) => data[key]
          );
          if (summariesArr && summariesArr.length > 0) {
            setSummaries(summariesArr);
          }
        } else {
          setSummaries([]);
        }
        return () => off(summariesData);
      },
      (error) => {
        console.error('Failed to fetch summaries:', error);
      }
    );

    return () => unsubscribe();
  }, [novelId, state]);

  useEffect(() => {
    const timeStamp = ref(
      database,
      `novels/content/summaries/${novelId}/timestamp`
    );
    let intervalId: NodeJS.Timeout;

    const unsubscribe = onValue(
      timeStamp,
      (snapshot) => {
        const time: string = snapshot.val();
        if (time) {
          const updateTimestamp = () => {
            const formattedTime = displayTimeAgo(time);
            setTimestamp(formattedTime);
          };

          updateTimestamp(); // Initial update
          intervalId = setInterval(updateTimestamp, 60000); // Update every minute
        }
      },
      (error) => {
        console.error('Failed to fetch summaries:', error);
      }
    );

    return () => {
      unsubscribe();
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [novelId, state]);

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <StepContentHeader
          novelId={novelId}
          currentAction={`Get chapter summaries for ${novelName}`}
          nextAction="Step three: Get hero journey stages"
          currentStepName="Two"
          nextStepName="three"
        >
          <form className="sm:flex sm:items-center" action={formAction}>
            <input type="hidden" name="novelId" value={novelId} />
            <input type="hidden" name="novelName" value={novelName} />
            <button
              type="submit"
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
            >
              Get Chapter Summaries
            </button>
          </form>
        </StepContentHeader>

        <div className="mx-auto max-w-4xl">
          {summaries.length && timestamp ? (
            <h2>Summaries created and added to the database {timestamp}.</h2>
          ) : (
            ''
          )}
          {state.message && <p>{state.message}</p>}
          <div className="space-y-16 sm:mt-4 sm:pt-4">
            {Array.isArray(summaries) && summaries.length ? (
              summaries.map((summary: ChapterSummary) => (
                <article
                  key={summary.chapterId}
                  className="flex max-w-3xl flex-col items-start justify-between"
                >
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      {summary.chapterTitle} - {summary.chapterId}
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-gray-600">
                      {summary.summary}
                    </p>
                  </div>
                </article>
              ))
            ) : state.message ? (
              ''
            ) : (
              <p>There are no summaries yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
