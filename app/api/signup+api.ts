import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { ExpoResponse } from 'expo-router/server';
import { z } from 'zod';
import { createSession } from '../../database/sessions';
import { createUser, getUserByEmail } from '../../database/users';

const signupSchema = z.object({
  email: z.string().email(),
  passwordHash: z.string().min(1),
  firstName: z.string(),
  lastName: z.string(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const result = signupSchema.safeParse(body);
  // const { email, passwordHash, firstName, lastName } = body;

  if (!result.success) {
    return ExpoResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  const user = await getUserByEmail(result.data.email);

  if (user) {
    return ExpoResponse.json(
      {
        errors: [{ message: 'Email is already taken' }],
      },
      { status: 403 },
    );
  }
  // // 4. Hash the plain password from the user
  // const passwordHash = await bcrypt.hash(result.data.passwordHash, 12);

  // 5. Save the user information with the hashed password in the database
  const newUser = await createUser(
    result.data.email,
    result.data.passwordHash,
    result.data.firstName,
    result.data.lastName,
  );
  console.log(newUser);
  if (!newUser) {
    //   return ExpoResponse.json({ success: true, user: newUser });
    // } else {
    return ExpoResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 },
    );
  }

  // // 6. Create a token
  // const token = crypto.randomBytes(100).toString('base64');

  // // 7. Create the session record
  // const session = await createSession(newUser.id, token);

  // if (!session) {
  //   return ExpoResponse.json(
  //     { errors: [{ message: 'Error creating the new session' }] },
  //     {
  //       status: 401,
  //     },
  //   );
  // }

  // 8. Send the new cookie in the headers
  // cookies().set({
  //   name: 'sessionToken',
  //   value: session.token,
  //   httpOnly: true,
  //   path: '/',
  //   secure: process.env.NODE_ENV === 'production',
  //   maxAge: 60 * 60 * 24, // Expires in 24 hours,
  //   sameSite: 'lax',
  // });

  // cookies().set({
  //   name: 'sessionToken',
  //   value: session.token,
  //   ...secureCookieOptions,
  // });

  return ExpoResponse.json({
    user: newUser,
  });
}
