import cookie from 'cookie';
import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { z } from 'zod';
import {
  checkExistingFavorite,
  createFavorite,
  getFavoritesByUser,
} from '../../database/favorites';

const favoritesSchema = z.object({
  userId: z.number(),
  bookId: z.number(),
});

export async function POST(request: ExpoRequest) {
  console.log('API Running Favorites', request.headers);

  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const token = cookies.sessionToken;
  console.log('sessionToken:', token);

  const body = await request.json();
  const result = favoritesSchema.safeParse(body);
  console.log('result in api', result);
  if (!result.success) {
    return ExpoResponse.json(
      { errors: [{ message: 'Save favorite not successful' }] },
      {
        status: 400,
      },
    );
  }

  const existingFavorite =
    token &&
    (await checkExistingFavorite(result.data.userId, result.data.bookId));
  if (existingFavorite) {
    return ExpoResponse.json({ message: 'Book already saved as favorite' });
  }

  const userFavorites =
    token && (await createFavorite(token, result.data.bookId));

  if (!userFavorites) {
    return ExpoResponse.json({ error: 'user favorites creation failed' });
  }

  return ExpoResponse.json({ favorites: userFavorites });
}

export async function GET(request: ExpoRequest) {
  console.log('API Running GET favs', request.headers);

  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const token = cookies.sessionToken;
  console.log('sessionToken:', token);

  const userWithBooks = token && (await getFavoritesByUser(token));
  console.log('userWithBooks Variable:', userWithBooks);

  if (!userWithBooks) {
    return ExpoResponse.json({ error: 'user with saved books not found' });
  }

  return ExpoResponse.json({ user: userWithBooks });
}
