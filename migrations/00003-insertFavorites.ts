// import { Sql } from 'postgres';

// export async function up(sql: Sql) {
//   for (const testUser of testUsers) {
//     await sql`
//     INSERT INTO users(firstname, lastname, password_hash)
//     VALUES
//     (
//       ${testUser.firstName},
//       ${testUser.lastName},
//       ${testUser.passwordHash}
//     )
//   `;
//   }
// }

// export async function down(sql: Sql) {
//   for (const testUser of testUsers) {
//     await sql`
//       DELETE FROM users
//       WHERE
//         id = ${testUser.id}
//     `;
//   }
// }
