import { Favorites } from '../migrations/00007-createTableFavorites';
import { sql } from './connect';

export const getFavorites = async (token: string) => {
  const favorites = await sql<Favorites[]>`
    SELECT
      favorites.*
    FROM
      favorites
      INNER JOIN sessions ON (
        sessions.token = ${token}
        AND favorites.user_id = sessions.user_id
        AND favorites.book_id = sessions.book_id
        AND sessions.expiry_timestamp > now()
      )
  `;
  return favorites;
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
