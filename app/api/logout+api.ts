import cookie from 'cookie';
import * as AuthSession from 'expo-auth-session';
import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { deleteSession } from '../../database/sessions';
import { getUser } from '../../database/users';

export async function GET(request: ExpoRequest) {
  // 1. Get the session token from the cookie
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const token = cookies.sessionToken;
  console.log('sessionToken:', token);

  // 2. Delete the session from the database based on the token
  if (token) await deleteSession(token);
  console.log('sessionToken deleted', token);

  return ExpoResponse.json(
    JSON.stringify({
      success: true,
      message: `Logout successful.`,
    }),
  );
}
