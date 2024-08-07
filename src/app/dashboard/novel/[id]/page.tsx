import { getNames } from '@/lib/actions/database/getNames';

export default async function Novel({ params }: { params: { id: string } }) {
  const id = params.id;
  const novelNames = (await getNames()) as Record<string, any>;
  const novelName = novelNames[id]?.name;

  return <div>Steps in progress for {novelName}</div>;
}
