import pkg from 'pg';
const {Client} = pkg;
import { createTableQuery } from '../model/query.js';

export const client = new Client({
    connectionString:process.env.POSTGRESQL_CONNECTION_STRING
})
await client.connect().then(()=>console.log("Connected to DB"));
 export async function createCoursesTable() {
    try {
      await client.query(createTableQuery);
      console.log('Courses table created successfully');
    } catch (error) {
      console.error('Error creating courses table:', error);
    }
}


  