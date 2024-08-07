import { getNames } from '@/lib/actions/database/getNames';
import StepContentHeader from '@/components/dashboard/steps/StepContentHeader';

export default async function StepThree({
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
      currentAction={`Get hero journey stages for ${novelName}`}
      nextAction="Step four: Get scenes for each chapter"
      currentStepName="Three"
      nextStepName="four"
    ></StepContentHeader>
  );
}
