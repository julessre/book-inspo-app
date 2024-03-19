import { ExpoResponse } from 'expo-router/server';
import { z } from 'zod';
import { getUserByEmail } from '../../database/users';

type User = {
  email: string;
  passwordHash: string;
};

const loginSchema = z.object({
  email: z.string().email(),
  passwordHash: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json();
  console.log('before z', body);
  const result = loginSchema.safeParse(body);
  console.log('after z', result);

  if (!result.success) {
    return ExpoResponse.json(
      { errors: [{ message: 'test' }] },
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

  return ExpoResponse.json({
    user: {
      email: userWithPasswordHash.email,
    },
  });
}
