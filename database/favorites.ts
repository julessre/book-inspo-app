import { Favorites } from '../migrations/00002-createTableFavorites';
import { sql } from './connect';

export const getUsers = async () => {
  const favorites = await sql<Favorites[]>`
    SELECT
      *
    FROM
      favorites
    ORDER BY
      id
  `;

  return favorites;
};
