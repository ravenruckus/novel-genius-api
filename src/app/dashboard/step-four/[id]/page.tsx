import { notFound } from 'next/navigation';
import getNovelName from '@/lib/utils/getNovelName';
import StepContentHeader from '@/components/dashboard/steps/StepContentHeader';

export default async function StepFour({ params }: { params: { id: string } }) {
  const id = params.id;
  const novelName = await getNovelName(id);
  if (!novelName) notFound();

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
