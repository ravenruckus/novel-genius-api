import { notFound } from 'next/navigation';
import getNovelName from '@/lib/utils/getNovelName';
import ChapterSummaries from '@/components/dashboard/ChapterSummaries';

export default async function StepTwo({ params }: { params: { id: string } }) {
  const id = params.id;
  const novelName = await getNovelName(id);
  if (!novelName) notFound();

  return <ChapterSummaries novelId={id} novelName={novelName} />;
}
