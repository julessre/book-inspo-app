import { sql } from './connect';

export type User = {
  id: number;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
};

type UserWithPasswordHash = User & {
  passwordHash: string;
};

type Token = {
  value: string;
  expiration: string;
};

export const getUser = async (token: string) => {
  const [user] = await sql<Pick<User, 'email'>[]>`
    SELECT
      users.email,
      users.firstName,
      users.lastName
    FROM
      users
      INNER JOIN sessions ON (
        sessions.token = ${token}
        AND sessions.user_id = users.id
        AND sessions.expiry_timestamp > now()
      )
  `;
  return user;
};

export const getUserByUsernameWithPasswordHash = async (email: string) => {
  const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      *
    FROM
      users
    WHERE
      email = ${email}
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
