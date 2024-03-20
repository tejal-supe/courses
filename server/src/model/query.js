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
    INSERT INTO courses (thumbnail, name,author,description,creation_date) VALUES ($1,$2,$3,$4,$5)
`
export const getAllCoursesQuery = `SELECT * FROM courses`
export const deleteCourseQuery = `DELETE FROM courses;`
export const updateCourseQuery = `UPDATE courses
SET thumbnail = $1 name = $2 author = $3 description = $4 WHERE id = $5 
`