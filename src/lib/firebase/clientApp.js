'use client';

import { initializeApp, getApps } from 'firebase/app';
import { firebaseConfig } from './config';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);
export const database = getDatabase(firebaseApp);
