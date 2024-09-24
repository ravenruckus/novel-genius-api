import { notFound } from 'next/navigation';
import getNovelName from '@/lib/utils/getNovelName';
import StepContentHeader from '@/components/dashboard/steps/StepContentHeader';

export default async function StepSeven({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const novelName = await getNovelName(id);
  if (!novelName) notFound();
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
