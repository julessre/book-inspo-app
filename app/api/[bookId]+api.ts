import { ExpoResponse } from 'expo-router/server';
import { getBookById } from '../../database/books';

// import { Books } from '../migrations/00004-createTableBooks';

export async function GET(request: Request, { bookId }: { bookId: string }) {
  const bookDetail = await getBookById(bookId);
  return ExpoResponse.json({ bookDetail });
}
