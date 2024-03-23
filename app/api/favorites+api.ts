import cookie from 'cookie';
import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { getFavorites } from '../../database/favorites';

export async function GET(request: ExpoRequest) {
  // 1. get the session token from the cookie
  console.log('API Running', request.headers);

  // const cookies = request.headers.get('cookie');
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const token = cookies.sessionToken;
  console.log('sessionToken:', token);

  // 2. validate that session
  // 3. get the user profile matching the session
  const userFavorites = token && (await getFavorites(token));

  if (!userFavorites) {
    return ExpoResponse.json({ error: 'user favorites not found' });
  }
  // 4. return the user profile

  return ExpoResponse.json({ favorites: userFavorites });
}
