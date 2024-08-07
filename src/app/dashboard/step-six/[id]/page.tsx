import { getNames } from '@/lib/actions/database/getNames';
import StepContentHeader from '@/components/dashboard/steps/StepContentHeader';

export default async function StepSix({ params }: { params: { id: string } }) {
  const id = params.id;
  const novelNames = (await getNames()) as Record<string, any>;
  const novelName = novelNames[id]?.name;

  return (
    <StepContentHeader
      novelId={id}
      currentAction={`Create high level writing goals for each scene in ${novelName}`}
      nextAction="Step seven: Create scene feedback prompts"
      currentStepName="Six"
      nextStepName="seven"
    ></StepContentHeader>
  );
}
