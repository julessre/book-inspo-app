import { Sql } from 'postgres';

const testUsers = [
  {
    id: 1,
    firstName: 'Viktor',
    lastName: 'Piwald',
    passwordHash: 'password',
    email: 'vipi@email.com',
  },
  {
    id: 2,
    firstName: 'Max',
    lastName: 'Wimmer',
    passwordHash: 'password',
    email: 'mawi@email.com',
  },
  {
    id: 3,
    firstName: 'Claudia',
    lastName: 'Bauer',
    passwordHash: 'password',
    email: 'claba@email.com',
  },
];

export async function up(sql: Sql) {
  for (const testUser of testUsers) {
    await sql`
    INSERT INTO users(email, password_hash, firstname, lastname)
    VALUES
    (
      ${testUser.email},
      ${testUser.passwordHash},
      ${testUser.firstName},
      ${testUser.lastName}
    )
  `;
  }
}

export async function down(sql: Sql) {
  for (const testUser of testUsers) {
    await sql`
      DELETE FROM users
      WHERE
        id = ${testUser.id}
    `;
  }
}
