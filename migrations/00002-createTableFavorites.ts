import { Sql } from 'postgres';

export type Favorites = {
  id: number;
  usersId: number;
  booksId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE favorites (
      id integer PRIMARY key generated always AS identity,
      users_id integer NOT NULL,
      books_id integer NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
      DROP TABLE favorites
    `;
}
