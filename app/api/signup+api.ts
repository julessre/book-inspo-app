import { ExpoResponse } from 'expo-router/server';
import { z } from 'zod';
import { createUser, getUserByEmail } from '../../database/users';

type User = {
  id: number;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
};

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

  return ExpoResponse.json({
    user: newUser,
  });
}
