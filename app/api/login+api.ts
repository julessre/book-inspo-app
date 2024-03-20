import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { z } from 'zod';
import { createSession } from '../../database/sessions';
import { getUserByEmail } from '../../database/users';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';

const loginSchema = z.object({
  email: z.string().email(),
  passwordHash: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json();
  // console.log('before z', body);
  const result = loginSchema.safeParse(body);
  // console.log('after z', result);
  const headers = new Headers();

  if (!result.success) {
    return ExpoResponse.json(
      { errors: [{ message: 'Login not successful' }] },
      {
        status: 400,
      },
    );
  }

  const userWithPasswordHash = await getUserByEmail(result.data.email);
  // console.log(userWithPasswordHash);

  if (!userWithPasswordHash) {
    return ExpoResponse.json(
      {
        errors: [{ message: 'email or password not valid' }],
      },
      { status: 403 },
    );
  }

  // // 3. validate the password
  // const isPasswordValid = await bcrypt.compare(
  //   result.data.passwordHash,
  //   userWithPasswordHash.passwordHash,
  // ); // Boolean

  // if (!isPasswordValid) {
  //   // consider using the same output for user or password not valid
  //   return ExpoResponse.json(
  //     { errors: [{ message: 'password is not valid' }] },
  //     { status: 401 },
  //   );
  // }

  // 4. create a session
  // - create the token
  const token = crypto.randomBytes(80).toString('base64');
  console.log(token);

  // - create the session
  const session = await createSession(userWithPasswordHash.id, token);

  if (!session) {
    return ExpoResponse.json(
      { errors: [{ message: 'session creation failed' }] },
      { status: 500 },
    );
  }

  const serializedCookie = createSerializedRegisterSessionTokenCookie(
    session.token,
  );

  // add the new header
  headers.set('Set-Cookie', 'a=1;');
  console.log('Headers setting', headers);

  return ExpoResponse.json(
    {
      user: {
        email: userWithPasswordHash.email,
      },
    },
    {
      headers: {
        'Set-Cookie': serializedCookie,
      },
    },
  );
}
