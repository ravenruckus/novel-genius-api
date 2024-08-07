'use client';

import Link from 'next/link';
import { useUser } from '@/lib/getUser';

export default function Home() {
  const user = useUser();

  return (
    <main>
      {user && (
        <>
          <Link href="/dashboard">Go to Dashboard</Link>
        </>
      )}
    </main>
  );
}
