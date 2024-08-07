import { getNames } from '@/lib/actions/database/getNames';
import StepContentHeader from '@/components/dashboard/steps/StepContentHeader';

export default async function StepFive({ params }: { params: { id: string } }) {
  const id = params.id;
  const novelNames = (await getNames()) as Record<string, any>;
  const novelName = novelNames[id]?.name;

  return (
    <StepContentHeader
      novelId={id}
      currentAction={`Analyze scenes for  ${novelName}`}
      nextAction="Step six: Create high level writing goals for each scene"
      currentStepName="Five"
      nextStepName="six"
    ></StepContentHeader>
  );
}
