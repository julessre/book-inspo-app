import cookie from 'cookie';
import * as AuthSession from 'expo-auth-session';
import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { getUser } from '../../database/users';

// import cookie from 'cookie';

export async function GET(request: ExpoRequest) {
  // 1. get the session token from the cookie
  console.log('API Running', request.headers);

  // const cookies = request.headers.get('cookie');
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const token = cookies.sessionToken;
  console.log('sessionToken:', token);

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUser(token));

  if (!user) {
    return ExpoResponse.json({ error: 'user not found' });
  }
  // 4. return the user profile

  return ExpoResponse.json({ user: user });
}
