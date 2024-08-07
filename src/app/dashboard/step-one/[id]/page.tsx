import Link from 'next/link';
import { getNames } from '@/lib/actions/database/getNames';
import getNovel from '@/lib/actions/getNovel';
import StepContentHeader from '@/components/dashboard/steps/StepContentHeader';

export default async function StepOne({ params }: { params: { id: string } }) {
  const id = params.id;
  const novelNames = (await getNames()) as Record<string, any>;
  const novelName = novelNames[id]?.name;
  const novel = await getNovel(id, novelName);

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <StepContentHeader
            novelId={id}
            currentAction={`View ${novelName} chapters`}
            nextAction="Step two: Get chapter summaries"
            currentStepName="One"
            nextStepName="two"
          ></StepContentHeader>

          <div className="mx-auto max-w-4xl">
            <div className="space-y-16 sm:mt-4 sm:pt-4">
              {novel &&
                Object.keys(novel.chapters).map((key: string) => (
                  <article
                    key={key}
                    className="flex max-w-3xl flex-col items-start justify-between"
                  >
                    <div className="group relative">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <Link href={`/dashboard/step-one/${novel.id}/${key}`}>
                          <span className="absolute inset-0" />
                          {key}
                        </Link>
                      </h3>
                      <p className="mt-5 line-clamp-4 text-sm leading-6 text-gray-600">
                        {novel.chapters[key]}
                      </p>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
