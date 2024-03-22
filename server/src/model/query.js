export const createTableQuery = `
  CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    thumbnail VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT,
    creation_date DATE 
  )
`;
export const addCourseQuery = `
    INSERT INTO courses (thumbnail,name,author,description) VALUES ($1,$2,$3,$4)
`;
export const getAllCoursesQuery = `SELECT * FROM  courses`;

export const deleteCourseQuery = `DELETE FROM courses WHERE id = $1`;

export const updateCourseQuery = (keys, argKeys, id) => `UPDATE courses
    SET (${keys}) = (${argKeys}) WHERE id = ${id}`;

export const getCourseByAuthors =(authorsArray) => `
SELECT * FROM courses WHERE author IN (${authorsArray.map((_, index) => `$${index + 1}`).join(',')})
`