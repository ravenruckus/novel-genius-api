'use server';
import { redirect } from 'next/navigation';

export async function selectNovel(formData: FormData) {
  const selectedNovel = formData.get('novel')?.toString() ?? '';
  redirect(`/dashboard/step-one/${selectedNovel}`);
}
