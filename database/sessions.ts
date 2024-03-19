import { Session } from '../migrations/00006-createTableSessions';
import { sql } from './connect';

export const getValidSession = async (token: string) => {
  const [session] = await sql<Pick<Session, 'id' | 'token'>[]>`
    SELECT
      sessions.id,
      sessions.token
    FROM
      sessions
    WHERE
      sessions.token = ${token}
      AND sessions.expiry_timestamp > now()
  `;

  return session;
};

export const createSession = async (userId: number, token: string) => {
  const [session] = await sql<Session[]>`
      INSERT INTO
        sessions (user_id, token)
      VALUES
        (
          ${userId},
          ${token}
        )
      RETURNING
        sessions.id,
        sessions.token,
        sessions.user_id
    `;

  await sql`
      DELETE FROM sessions
      WHERE
        expiry_timestamp < now()
    `;

  return session;
};

export const deleteSession = async (token: string) => {
  // 'Pick' is a TS utility type that picks specified properties
  // from a type and excluding the rest
  const [session] = await sql<Pick<Session, 'id' | 'token'>[]>`
    DELETE FROM sessions
    WHERE
      sessions.token = ${token}
    RETURNING
      sessions.id,
      sessions.token
  `;

  return session;
};
