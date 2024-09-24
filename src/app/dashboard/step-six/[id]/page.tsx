import { notFound } from 'next/navigation';
import getNovelName from '@/lib/utils/getNovelName';
import StepContentHeader from '@/components/dashboard/steps/StepContentHeader';

export default async function StepSix({ params }: { params: { id: string } }) {
  const id = params.id;
  const novelName = await getNovelName(id);
  if (!novelName) notFound();

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
