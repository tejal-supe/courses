import pkg from 'pg';
const {Pool} = pkg;
import { createTableQuery } from '../model/query.js';

export const pool = new Pool({
    connectionString:process.env.POSTGRESQL_CONNECTION_STRING
})
 export async function createCoursesTable() {
    try {
      await pool.query(createTableQuery);
      console.log('Courses table created successfully');
    } catch (error) {
      console.error('Error creating courses table: ', error);
    }
}
const handleConnectionError = (err) => {
  console.error('Connection error:', err);
  
  // Attempt reconnection after a delay (e.g., 5 seconds)
  setTimeout(() => {
    console.log('Attempting to reconnect...');
    connectToDatabase();
  }, 5000); 
};


const connectToDatabase = () => {
  console.log('Connecting to the database...');
  pool.connect((err, client, release) => {
    if (err) {
      // Handle connection error
      handleConnectionError(err);
    } else {
      console.log('Connected to the database');
      release();
    }
  });
};

connectToDatabase()