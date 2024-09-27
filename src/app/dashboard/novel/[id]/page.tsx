import { notFound } from 'next/navigation';
import getNovelName from '@/lib/utils/getNovelName';

export default async function Novel({ params }: { params: { id: string } }) {
  const id = params.id;
  const novelName = await getNovelName(id);
  if (!novelName) notFound();

  return <div>Steps in progress for {novelName && novelName}</div>;
}
