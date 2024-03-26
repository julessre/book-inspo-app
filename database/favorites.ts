import {
  Favorites,
  userWithBooks,
} from '../migrations/00007-createTableFavorites';
import { sql } from './connect';

export const getFavoritesByUser = async (token: string) => {
  const [userWithFavorites] = await sql<userWithBooks[]>`
    SELECT
    users.id AS user_id,
    users.email AS user_email,
    users.firstName AS user_first_name,
    users.lastName AS user_last_name,
    -- Return empty array instead of [null] if no book is found
      coalesce(
        json_agg(books.*) FILTER (
          WHERE
          books.id IS NOT NULL
        ),
        '[]'
      ) AS favorites
      FROM
      users
       LEFT JOIN favorites ON users.id = favorites.user_id
       LEFT JOIN books ON books.id = favorites.book_id
         INNER JOIN sessions ON (
        sessions.token = ${token}
        AND users.id = sessions.user_id
        AND sessions.expiry_timestamp > now()
      )
       WHERE
       token = ${token}
      GROUP BY
      users.id
      `;
  return userWithFavorites;
};

export const checkExistingFavorite = async (userId: number, bookId: number) => {
  const existingFavorites = await sql`
    SELECT
    *
    FROM
    favorites
    WHERE user_id = ${userId} AND book_id = ${bookId}
  `;

  return existingFavorites.length > 0;
};

export const createFavorite = async (token: string, bookId: number) => {
  const [favorite] = await sql<Favorites[]>`
    INSERT INTO
      favorites (user_id, book_id) (
      SELECT
      user_id,
      ${bookId}
      FROM
      sessions
      WHERE
       token = ${token}
            AND sessions.expiry_timestamp > now()
      )
      RETURNING
        favorites.*

  `;
  return favorite;
};
