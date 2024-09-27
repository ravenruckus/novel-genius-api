'use client';

import { useUser } from '@/lib/getUser';

export default function Home() {
  const user = useUser();

  return (
    <main>
      {user && (
        <>
          <a href="/dashboard">Go to Dashboard</a>
        </>
      )}
    </main>
  );
}
