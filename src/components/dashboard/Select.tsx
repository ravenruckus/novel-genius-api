'use client';
import { useEffect, useState } from 'react';
import { getNames } from '@/lib/actions/database/getNames';
import { NovelName, Dictionary } from '@/lib/definitions';

// add select from SelectNovel.tsx

export default function Select() {
  const [novelNames, setNovelNames] = useState<
    Dictionary<NovelName> | undefined
  >();

  useEffect(() => {
    const getNovelNames = async () => {
      const novelNames = await getNames();
      setNovelNames(novelNames);
    };
    getNovelNames();
  }, []);

  return (
    <select
      id="novel"
      name="novel"
      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
      {novelNames &&
        Object.values(novelNames).map((name: any) => (
          <option key={name.id} value={name.id}>
            {name.name}
          </option>
        ))}
    </select>
  );
}
