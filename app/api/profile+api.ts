import * as AuthSession from 'expo-auth-session';
import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { getUserBySessionToken } from '../../database/users';

// import cookie from 'cookie';

export function GET(request: ExpoRequest) {
  // const headers = new Headers();
  console.log('API Running', request.headers);
  // this is a protected Route Handler
  // 1. get the session token from the cookie
  // const cookieStore = cookies();
  // const token = request.headers.get('Set-cookie');
  // request.headers.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  // const user = token && (await getUserBySessionToken(token.value));

  // if (!user) {
  //   return ExpoResponse.json({ error: 'user not found' });
  // }
  // 4. return the user profile

  return ExpoResponse.json({ user: 'user' });
}
