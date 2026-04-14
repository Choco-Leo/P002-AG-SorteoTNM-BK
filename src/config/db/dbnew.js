import pool from '../db.js';
import { createUser } from '../../models/userRepository.js';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;');

    await client.query('DROP TABLE IF EXISTS gruposst;');
    await client.query('DROP TABLE IF EXISTS loginst;');

    await client.query(`
      CREATE TABLE IF NOT EXISTS loginst (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        usernick VARCHAR(100) UNIQUE NOT NULL,
        passwd TEXT NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS gruposst (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        it_part VARCHAR(100) NOT NULL,
        deport_select VARCHAR(100) NOT NULL,
        grupo_select VARCHAR(100) NOT NULL
      );
    `);

    await client.query(
      'CREATE INDEX IF NOT EXISTS idx_gruposst_deport_grupo ON gruposst (deport_select, grupo_select);'
    );
    await client.query('CREATE INDEX IF NOT EXISTS idx_gruposst_it_part ON gruposst (it_part);');

    await client.query('COMMIT');
    return { success: true, message: 'Tablas creadas correctamente' };
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch {
    }
    return { success: false, message: 'Error creando tablas', error };
  } finally {
    client.release();
  }
};

export const createDefaultUser = async () => {
  const userNick = 'TECNMAccess01';
  const passWD = 'TECNMAccess01';
  const user = await createUser(userNick, passWD);
  return { success: true, data: user };
};

export const initDatabase = async () => {
  const tablesResult = await createTables();
  if (!tablesResult.success) return tablesResult;
  const userResult = await createDefaultUser();
  return { success: true, tables: tablesResult, user: userResult };
};

const isDirectRun =
  typeof process.argv[1] === 'string' && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isDirectRun) {
  initDatabase()
    .then((result) => {
      console.log(result);
      process.exit(result?.success ? 0 : 1);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
