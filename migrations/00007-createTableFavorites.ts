import { Sql } from 'postgres';
import { Books } from './00004-createTableBooks';

export type Favorites = {
  id: number;
  usersId: number;
  booksId: number;
};

export type JsonAgg = Books[];

export type userWithBooks = {
  userId: number;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  userBooks: JsonAgg;
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
