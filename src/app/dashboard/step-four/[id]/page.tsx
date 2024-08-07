import { getNames } from '@/lib/actions/database/getNames';
import StepContentHeader from '@/components/dashboard/steps/StepContentHeader';

export default async function StepFour({ params }: { params: { id: string } }) {
  const id = params.id;
  const novelNames = (await getNames()) as Record<string, any>;
  const novelName = novelNames[id]?.name;

  return (
    <StepContentHeader
      novelId={id}
      currentAction={`Get scenes for ${novelName}`}
      nextAction="Step five: Analyze scenes"
      currentStepName="Four"
      nextStepName="five"
    ></StepContentHeader>
  );
}
