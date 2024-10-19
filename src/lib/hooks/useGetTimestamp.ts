import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { formatDistanceToNow } from 'date-fns';
import { database } from '@/lib/firebase/clientApp';

function displayTimeAgo(timestamp: string): string {
  const date = new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true });
}

export default function useGetTimestamp(path: string) {
  const [timestampString, setTimestampString] = useState<string>('');

  useEffect(() => {
    const timeStamp = ref(database, path);
    let intervalId: NodeJS.Timeout;

    const unsubscribe = onValue(
      timeStamp,
      (snapshot) => {
        const time: string = snapshot.val();
        if (time) {
          const updateTimestamp = () => {
            const formattedTime = displayTimeAgo(time);
            setTimestampString(formattedTime);
          };

          updateTimestamp(); // Initial update
          intervalId = setInterval(updateTimestamp, 60000); // Update every minute
        }
      },
      (error) => {
        console.error('Failed to fetch summaries:', error);
      }
    );

    return () => {
      unsubscribe();
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [path]);

  return timestampString;
}
