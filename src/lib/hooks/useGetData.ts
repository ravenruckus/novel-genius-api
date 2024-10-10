import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '@/lib/firebase/clientApp';
import { Dictionary } from '@/lib/definitions';

export default function useGetData<T>(path: string) {
  const [data, setData] = useState<Array<T> | []>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const dataRef = ref(database, path);

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const fetchedData: Dictionary<T> = snapshot.val();
      if (fetchedData) {
        const dataArray: Array<T> = Object.keys(fetchedData).map(
          (key) => fetchedData[key]
        );
        setData(dataArray);
      } else {
        setData([]);
      }
      console.error('Failed to fetch data:', error);
      setError(error);
    });

    return () => unsubscribe();
  }, [path]);

  return { data, error };
}
