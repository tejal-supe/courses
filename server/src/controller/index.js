import { v2 as cloudinary } from 'cloudinary' 
import fs from "fs"
import { pool } from '../connection/config.js';
import { addCourseQuery, deleteCourseQuery, getAllCoursesQuery } from '../model/query.js';

//Cloudinary Credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Upload image to cloudinary
async function uploadImage(file) {
    const result = await cloudinary.uploader.upload(file.filename);
    fs.unlinkSync(file.filename);
    return result.url;
}

// Add course controller
export const addCourse=async(req,res)=>{
    try {
        const {name,author,description} = req.body;
        const image = req.file;
        const thumbnail = image ? await uploadImage(image) : null; // get the url
        const values = [thumbnail,name,author,description]

        if(!thumbnail){
            res.json({error:"Missing thumbnail"})
        }
        await pool.query(addCourseQuery,values);
        res.json({message:"Course Added succesfully"})
    } catch (error) {
        console.log(error,'error');
        // res.status(500).send(error);
    }
}

//get all course and get course by author(s) controller
export const getAllCourses = async (req,res)=>{
    try {
        let query;
        let queryParams;
        if (Object.keys(req.query).length === 0) {
          // If no query parameters, fetch all courses
          query = getAllCoursesQuery;
          queryParams = [];
        } else {
          // fetch by author(s)
          const { author } = req.query;
          const authorsArray = author.split(',');
          query = `
            SELECT * 
            FROM courses 
            WHERE author IN (${authorsArray.map((_, index) => `$${index + 1}`).join(',')})
          `;
          queryParams = authorsArray;
        }
        const data = await pool.query(query, queryParams);
        res.json({ data: data.rows });
        
    } catch (error) {
        console.log(error,'errpr');
        res.status(500).json(error)
    }
}
// delete course by id controller
export const deleteCourse = async(req,res)=>{
    try {
        const {id} = req.params;
        await pool.query(deleteCourseQuery,[id])
        res.json({message:"Course is deleted successfully"})
    } catch (error) {
        console.log(error,'error');
        res.json({error})
    }
}

// update course controller
export const updateCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const { thumbnail } = req.file ? await uploadImage(req.file) : {};
        const fieldsToUpdate = req.body;
        const updates = Object.entries(fieldsToUpdate).map(([key, value], index) => {
            return `${key} = $${index + 1}`;
        });

        if (thumbnail) {
            updates.push(`thumbnail = $${updates.length + 1}`);
        }

        const values = Object.values(fieldsToUpdate);
        if (thumbnail) {
            values.push(thumbnail);
        }
        values.push(id);

        const query = `
            UPDATE courses
            SET ${updates.join(', ')}
            WHERE id = $${values.length}
        `;
        
        await pool.query(query, values);
        res.status(200).json({ message: "Data updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
