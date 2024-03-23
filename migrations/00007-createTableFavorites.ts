import { Sql } from 'postgres';

export type Favorites = {
  id: number;
  usersId: number;
  booksId: number;
};

export async function up(sql: Sql) {
  await sql`
     CREATE TABLE favorites (
      user_id integer REFERENCES users(id),
      book_id integer REFERENCES books(id),
      PRIMARY KEY (user_id, book_id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
      DROP TABLE favorites
    `;
}
