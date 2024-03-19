import { Sql } from 'postgres';

export type Books = {
  id: number;
  title: string;
  author: string;
  publishingYear: number;
  description: string;
  numberOfPages: number;
  coverImageLink: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE books (
      id integer PRIMARY key generated always AS identity,
      title varchar(100) NOT NULL,
      author varchar(100) NOT NULL,
      publishing_year integer,
      description varchar(1000) NOT NULL,
      number_of_pages integer,
      cover_image_link varchar(300)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
      DROP TABLE books
    `;
}
