import { getNames } from '@/lib/actions/database/getNames';
import ChapterSummaries from '@/components/dashboard/ChapterSummaries';

export default async function StepTwo({ params }: { params: { id: string } }) {
  const id = params.id;
  const novelNames = (await getNames()) as Record<string, any>;
  const novelName = novelNames[id]?.name;

  return <ChapterSummaries novelId={id} novelName={novelName} />;
}
