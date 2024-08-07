/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

import { getNames } from '@/lib/actions/database/getNames';
import { redirect } from 'next/navigation';

export default async function SelectNovel() {
  const novelNames = (await getNames()) as Record<string, any>;

  async function selectAction(formData: FormData) {
    'use server';
    const selectedNovel = formData.get('novel')?.toString() ?? '';
    redirect(`/dashboard/step-one/${selectedNovel}`);
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Getting Started
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Select a novel to start</p>
        </div>
        <form className="mt-5 sm:flex sm:items-center" action={selectAction}>
          <div className="w-full sm:max-w-xs">
            <label htmlFor="location" className="sr-only">
              Novel Names and Ids
            </label>
            <select
              id="novel"
              name="novel"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {Object.values(novelNames).map((name: any) => (
                <option key={name.id} value={name.id}>
                  {name.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
          >
            Select
          </button>
        </form>
      </div>
    </div>
  );
}
