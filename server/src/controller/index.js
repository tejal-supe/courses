import { v2 as cloudinary } from 'cloudinary' 
import fs from "fs"
import { client } from '../connection/config.js';
import { addCourseQuery, deleteCourseQuery, getAllCoursesQuery } from '../model/query.js';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


export const addCourse=async(req,res)=>{
    try {
        const {name,author,description} = req.body;
        const image = req.file.filename;
        console.log('in controller',req.body,image);
        const result = await cloudinary.uploader.upload(image);
        console.log(result,'result');
        const thumbnail = result.url
        const values = [thumbnail,name,author,description]
        if(result){
            console.log('inside resilt');
            const course = await client.query(addCourseQuery,values)
            console.log(course,'course');
            await fs.unlinkSync(req.file.filename)
            res.json({course})

        }else{
            res.json({error:"Error in uploadinf"})
        }

        
    } catch (error) {
        console.log(error,'errror');
        res.status(500).json({error});
    }
    
}
export const getAllCourses = async (req,res)=>{
    try {
        const data= await client.query(getAllCoursesQuery)
        res.json({data:data.rows})
    } catch (error) {
        res.status(500).json({error})
    }
}
export const deleteCourse = async(req,res)=>{
    try {
        const deleted = await client.query(deleteCourseQuery)
        // cloudinary.uploader.destroy('sample', function(result) { console.log(result) });
        res.json({deleted})
    } catch (error) {
        res.json({error})
    }
}