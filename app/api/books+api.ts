import { ExpoResponse } from 'expo-router/server';
import { getBooks } from '../../database/books';

export async function GET() {
  const showBooks = await getBooks();
  return ExpoResponse.json({ showBooks });
}
