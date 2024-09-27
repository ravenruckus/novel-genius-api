'use server';

import { getDatabase } from 'firebase/database';
import { initializeServerApp } from 'firebase/app';
import { firebaseConfig } from '@/lib/firebase/config';
import { getAuthenticatedAppForUser } from '@/lib/firebase/serverApp';

export const getRTDatabase = async () => {
  const { idToken } = await getAuthenticatedAppForUser();
  const serverApp = initializeServerApp(firebaseConfig, {
    authIdToken: idToken,
  });
  const database = getDatabase(serverApp);

  return database;
};
