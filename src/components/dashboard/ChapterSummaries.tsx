'use client';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import getChapterSummaries from '@/lib/actions/getChapterSummaries';
import StepContentHeader from '@/components/dashboard/steps/StepContentHeader';

const initialState = {
  message: '',
  summaries: [],
};

export default function ChapterSummaries({
  novelId,
  novelName,
}: {
  novelId: string;
  novelName: string;
}) {
  const [state, formAction] = useFormState(getChapterSummaries, initialState);
  const [summaries, setSummaries] = useState<any>();

  useEffect(() => {
    if (state?.summaries) {
      setSummaries(state.summaries);
    }
  }, [state]);

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
          <div className="space-y-16 sm:mt-4 sm:pt-4">
            {summaries &&
              summaries.map((summary: any) => (
                <article
                  key={summary.id}
                  className="flex max-w-3xl flex-col items-start justify-between"
                >
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      {summary.chapter}
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-gray-600">
                      {summary.summary}
                    </p>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
