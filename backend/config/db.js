/**
 * This file is responsible for managing the MySQL database connection.
 * Handles configuration through environment variables.
 * 
 * @author Sebastian Villagomez
 */

/*
 * Import the MySQL library to interact with the database using promises.
 * Use the promise variant to simplify async database operations.
 */
import mysql from 'mysql2/promise';

/*
 * Loads the environment variables from the .env file. This is used to securely store
 * the database credentials.
 */
import dotenv from 'dotenv';

/*
 * Reads contents of .env files in root directory to access
 * through process.env.
 */
dotenv.config(); 

/*
 * Manages the connection to the database. Use a pool (collection of reusable connection
 * to database) for efficiency and good practice.
 */
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});


/** 
 * Establish and test connection with error handling.
 * Releases connection back tp the pool so it can be reused.
 */
export const connection = async () => {
    try {
      const connection = await pool.getConnection();
      console.log('Connected to MySQL database.');
      connection.release(); // Release the connection back to the pool
    } catch (error) {
      console.error('Unable to connect to the database:', error.message);
      process.exit(1);  //1:failure 0:success
    }
};

//export the pool to be able to make queries
export default pool;