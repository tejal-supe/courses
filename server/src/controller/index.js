import { v2 as cloudinary } from 'cloudinary' 
import fs from "fs"
import { pool } from '../connection/config.js';
import { addCourseQuery, deleteCourseQuery, getAllCoursesQuery, getCourseByAuthors, updateCourseQuery } from '../model/query.js';

//Cloudinary Credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Add course controller
export const addCourse=async(req,res)=>{
    try {
        const {name,author,description} = req.body;
        const image = req.file.filename;
        const thumbnail = (await cloudinary.uploader.upload(image)).url; // upload to cloudinary and get the url
        const values = [thumbnail,name,author,description]

        if(!thumbnail){
            res.json({error:"Error in uploading the image"})
            fs.unlinkSync(req.file.filename) // delete the file that is created by the multer diskstorage
        }
        await pool.query(addCourseQuery,values);
         fs.unlinkSync(req.file.filename) // delete the file that is created by the multer diskstorage
        res.json({message:"Course Added succesfully"})
    } catch (error) {
        console.log(error,'error');
        res.status(500).send(error);
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
export const updateCourseById = async(req,res) =>{
        try {
            const {id} = req.params
            const data = Object.keys(req.body);
            const values = Object.values(req.body);
            if(req.file){
                const result = await cloudinary.uploader.upload(req.file.filename);
                data.push('thumbnail')
                values.push(result.url)
            }
            const argKeys = data.map((obj,index) => `$${index+1}`).join(',');   
            await pool.query(updateCourseQuery(data.join(','),argKeys,id),values);
            if(req.file){
                fs.unlinkSync(req.file.filename);
            }
            res.status(200).json({message:"Data updated successfully"})
           
        } catch (error) {
            console.log(error);
            res.json({error})
        }
      
}