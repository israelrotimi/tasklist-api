import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: "localhost",      // Replace with your MariaDB host
  user: "root",          // Your MariaDB username
  password: "password",  // Your MariaDB password
  database: "testdb",    // Your MariaDB database name
  connectionLimit: 5,    // Max number of connections
});

const db = {
  query: async (sql, params) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query(sql, params);
      return result;
    } catch (err) {
      console.error("Database Query Error:", err);
      throw err;
    } finally {
      if (conn) conn.end(); // Release connection
    }
  },
};

export default db;
