import { sql } from './connect';

export type User = {
  id: number;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
};

export const getUsers = async () => {
  const users = await sql<User[]>`
    SELECT
      *
    FROM
      users
    ORDER BY
      id
  `;

  return users;
};

export const createUser = async (
  email: string,
  passwordHash: string,
  firstName: string,
  lastName: string,
) => {
  const [user] = await sql<User[]>`
       INSERT INTO
       users(email, password_hash, firstname, lastname)
      VALUES
        (
      ${email},
      ${passwordHash},
      ${firstName},
      ${lastName}
        )
      RETURNING
        id,
        email
    `;
  return user;
};

export const getUserByEmail = async (email: string) => {
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      email = ${email}
  `;
  return user;
};
