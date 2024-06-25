'use client';

import { callMenuSuggestionFlow } from '@/app/genkit';
import { useState } from 'react';
import { useUser } from '@/lib/getUser';
import AddItem from '@/components/AddItem';
import ListItems from '@/components/ListItems';

export default function Home() {
  const [menuItem, setMenu] = useState<string>('');
  const user = useUser();

  async function getMenuItem(formData: FormData) {
    const theme = formData.get('theme')?.toString() ?? '';
    const suggestion = await callMenuSuggestionFlow(theme);
    setMenu(suggestion);
  }

  return (
    <main>
      {user ? (
        <>
          <form action={getMenuItem}>
            <label>
              Suggest a menu item for a restaurant with this theme:{' '}
            </label>
            <input type="text" name="theme" />
            <button type="submit">Generate</button>
          </form>
          <br />
          <pre>{menuItem}</pre>
        </>
      ) : (
        <p>Sign in to generate a menu item</p>
      )}

      <AddItem />
      <ListItems />

    </main>
  );
}