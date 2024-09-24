export async function retry<T>(
  fn: () => Promise<T>,
  retries: number
): Promise<T> {
  for (let attempts = 0; attempts < retries; attempts++) {
    try {
      return await fn();
    } catch (error) {
      if (attempts >= retries - 1) {
        throw error;
      }
    }
  }
  throw new Error('Retry attempts exceeded');
}
