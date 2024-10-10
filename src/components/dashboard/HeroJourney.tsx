'use client';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import useGetData from '@/lib/hooks/useGetData';
import StepContentHeader from '@/components/dashboard/steps/StepContentHeader';
import assignHeroJournies from '@/lib/actions/assignHeroJournies';
import { ChapterSummary } from '@/lib/definitions';
import DisplayData from './DisplayData';
import Toggle from '../Toggle';
import useGetTimestamp from '@/lib/hooks/useGetTimestamp';

const initialState = {
  message: '',
};

export default function HeroJourney({
  novelId,
  novelName,
}: {
  novelId: string;
  novelName: string | undefined;
}) {
  const { data: summaries, error } = useGetData<ChapterSummary>(
    `novels/content/summaries/${novelId}/summaries`
  );
  const [state, formAction] = useFormState(assignHeroJournies, initialState);
  const [displaySummary, setDisplaySummary] = useState(true);
  const timestamp = useGetTimestamp(
    `novels/content/stages/${novelId}/timestamp`
  );

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <StepContentHeader
          novelId={novelId}
          currentAction={`Get hero journey stages for ${novelName}`}
          nextAction="Step four: Get scenes for each chapter"
          currentStepName="Three"
          nextStepName="four"
        >
          <form className="sm:flex sm:items-center" action={formAction}>
            <input type="hidden" name="novelId" value={novelId} />
            <input type="hidden" name="novelName" value={novelName} />
            <input
              type="hidden"
              name="summaries"
              value={JSON.stringify(summaries)}
            />
            <button
              type="submit"
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
            >
              Get Hero Journies
            </button>
          </form>
        </StepContentHeader>
        <div className="space-y-4 border-t border-gray-200 pt-10 sm:pt-8">
          <div className="mb-6 flex items-center gap-x-4 text-xs">
            <Toggle
              isOn={displaySummary}
              handleToggle={() => setDisplaySummary(!displaySummary)}
              text="Summaries"
            />
          </div>

          {state.message && (
            <p className="text-center text-gray-900">{state.message}</p>
          )}

          {timestamp && (
            <p className="text-sm text-gray-500">Last updated: {timestamp}</p>
          )}

          <DisplayData
            novelId={novelId}
            showStage={true}
            showSummary={displaySummary}
          />
        </div>
      </div>
    </div>
  );
}
