import { Suspense } from 'react';
import SelectNovel from '@/components/dashboard/SelectNovel';

export default function Dashboard() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SelectNovel />
      </Suspense>
    </div>
  );
}

// https://www.gutenberg.org/ebooks/offline_catalogs.html
