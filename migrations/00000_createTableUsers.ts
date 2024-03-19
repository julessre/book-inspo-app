import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY key generated always AS identity,
      email varchar(100) NOT NULL UNIQUE,
      password_hash varchar(60) NOT NULL,
      firstname varchar(50) NOT NULL,
      lastname varchar(50) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE users `;
}
