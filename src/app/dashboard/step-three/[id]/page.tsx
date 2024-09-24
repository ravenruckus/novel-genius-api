import { notFound } from 'next/navigation';
import getNovelName from '@/lib/utils/getNovelName';
import StepContentHeader from '@/components/dashboard/steps/StepContentHeader';

export default async function StepThree({
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
      currentAction={`Get hero journey stages for ${novelName}`}
      nextAction="Step four: Get scenes for each chapter"
      currentStepName="Three"
      nextStepName="four"
    ></StepContentHeader>
  );
}
