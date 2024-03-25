import { Books } from '../migrations/00004-createTableBooks';
import { sql } from './connect';

export const getBooks = async () => {
  const books = await sql<Books[]>`
    SELECT
      *
    FROM
      books
    -- ORDER BY
    --   id
    WHERE
      id in (30, 31, 32)
        `;

  return books;
};

export const getBookById = async (id: string) => {
  const [book] = await sql<Books[]>`
    SELECT
      *
    FROM
      books
    WHERE
      id = ${id}
  `;

  return book;
};
