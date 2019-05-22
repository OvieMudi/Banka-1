import pool from './index';

console.log('Dropping tables...');

(async () => {
  try {
    await pool.query('DROP TABLE IF EXISTS users CASCADE');
    await pool.query('DROP TABLE IF EXISTS accounts CASCADE');
    await pool.query('DROP TABLE IF EXISTS transactions CASCADE');
  } catch (error) {
    console.log(error);
  }
})();
