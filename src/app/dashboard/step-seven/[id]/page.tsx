import { getNames } from '@/lib/actions/database/getNames';
import StepContentHeader from '@/components/dashboard/steps/StepContentHeader';

export default async function StepSeven({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const novelNames = (await getNames()) as Record<string, any>;
  const novelName = novelNames[id]?.name;

  return (
    <StepContentHeader
      novelId={id}
      currentAction={`Create scene feedback prompts for ${novelName}`}
      nextAction="Step eight: Preview and publish final result"
      currentStepName="Seven"
      nextStepName="eight"
    ></StepContentHeader>
  );
}
