import { notFound } from 'next/navigation';
import getNovelName from '@/lib/utils/getNovelName';
import StepContentHeader from '@/components/dashboard/steps/StepContentHeader';

export default async function StepFive({ params }: { params: { id: string } }) {
  const id = params.id;
  const novelName = await getNovelName(id);
  if (!novelName) notFound();

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
