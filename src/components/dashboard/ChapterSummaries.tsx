'use client';
import { useFormState } from 'react-dom';
import getChapterSummaries from '@/lib/actions/getChapterSummaries';
import StepContentHeader from '@/components/dashboard/steps/StepContentHeader';
import DisplayData from '@/components/dashboard/DisplayData';
import useGetTimestamp from '@/lib/hooks/useGetTimestamp';

const initialState = {
  message: '',
};

export default function ChapterSummaries({
  novelId,
  novelName,
}: {
  novelId: string;
  novelName: string | undefined;
}) {
  const timestamp = useGetTimestamp(
    `novels/content/summaries/${novelId}/timestamp`
  );

  const [state, formAction] = useFormState(getChapterSummaries, initialState);

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
        {state.message && (
          <p className="text-center text-gray-900">{state.message}</p>
        )}

        {timestamp && (
          <p className="mb-3 text-sm text-gray-500">
            Last updated: {timestamp}
          </p>
        )}
        <DisplayData novelId={novelId} showStage={false} showSummary={true} />
      </div>
    </div>
  );
}
