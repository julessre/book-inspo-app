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
// export const getUserFavorites = async (userId: number) => {
//   const favorites = await sql`
//         SELECT b.*
//         FROM favorites f
//         JOIN books b ON f.book_id = b.id
//         WHERE f.user_id = ${userId}`;
//   return favorites;
// };
