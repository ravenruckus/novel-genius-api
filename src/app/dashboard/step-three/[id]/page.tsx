import { notFound } from 'next/navigation';
import getNovelName from '@/lib/utils/getNovelName';
import HeroJourney from '@/components/dashboard/HeroJourney';

export default async function StepThree({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const novelName = await getNovelName(id);
  if (!novelName) notFound();

  return <HeroJourney novelId={id} novelName={novelName} />;
}
