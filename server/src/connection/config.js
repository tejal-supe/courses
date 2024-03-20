import pkg from 'pg';
const {Pool} = pkg;
import { createTableQuery } from '../model/query.js';

export const client = new Pool({
    connectionString:process.env.POSTGRESQL_CONNECTION_STRING
})
await client.connect();
 export async function createCoursesTable() {
    try {
    //   const clienta= await client.connect();
      await client.query(createTableQuery);
      console.log('Courses table created successfully');
    //   client.release(); // Release the client back to the pool
    } catch (error) {
      console.error('Error creating courses table:', error);
    }
}


  