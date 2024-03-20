import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { getUserBySessionToken } from '../../database/users';

// import cookie from 'cookie';

export async function GET(request: ExpoRequest) {
  console.log('API Running', request.headers);
  // this is a protected Route Handler
  // 1. get the session token from the cookie
  // const cookieStore = cookies();
  // const token = cookieStore.get('sessionToken');
  // const headers = new Headers();
  // console.log('test headers', headers);
  // console.log('hi test', headers.get('sessionToken'));
  // console.log('hi test', headers.get('set-cookie'));

  // 2. validate that session
  // 3. get the user profile matching the session
  // const user = token && (await getUserBySessionToken(token.value));

  // if (!user) {
  //   return ExpoResponse.json({ error: 'user not found' });
  // }
  // 4. return the user profile

  return ExpoResponse.json({ user: 'user' });
}
