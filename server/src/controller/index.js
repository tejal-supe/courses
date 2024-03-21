import { v2 as cloudinary } from 'cloudinary' 
import fs from "fs"
import { client } from '../connection/config.js';
import { addCourseQuery, deleteCourseQuery, getAllCoursesQuery, getCourseByAuthors, updateCourseQuery } from '../model/query.js';

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
    }finally {
        await client.end()
     }
    
}
export const getAllCourses = async (req,res)=>{
    try {
        console.log(req.query,'qiery',Object.keys(req.query).length === 0);
        if(Object.keys(req.query).length === 0){
            const data= await client.query(getAllCoursesQuery)
            console.log(data,'data');
            res.json({data:data.rows})
        }
        else{

            const {author} = req.query;
            const authorsArray = author.split(',')
            const query = `
            SELECT * 
            FROM courses 
            WHERE author IN (${authorsArray.map((_, index) => `$${index + 1}`).join(',')})
          `;
            const data = await client.query(query, authorsArray)
            console.log(data,'data');
            res.json({data:data.rows})
        }
    } catch (error) {
        console.log(error,'errpr');
        res.status(500).json(error)
    }
}
export const deleteCourse = async(req,res)=>{
    try {
        const {id} = req.params;
console.log(id,'id');
        const deleted = await client.query(deleteCourseQuery,[id])
        console.log(deleted,'deleted');
        // cloudinary.uploader.destroy('sample', function(result) { console.log(result) });
        res.json({message:"Data is deleted"})
    } catch (error) {
        console.log(error,'error');
        res.json({error})
    }finally {
        await client.end()
     }
}

export const updateCourseById = async(req,res) =>{
        try {
            const data = Object.keys(req.body);
            const values = Object.values(req.body);
            if(req.file){
                const result = await cloudinary.uploader.upload(req.file.filename);
                data.push('thumbnail')
                values.push(result.url)
            }
            const argKeys = data.map((obj,index) => `$${index+1}`).join(',');   
            console.log(argKeys,'keyys',data,values);     
            const id = req.params.id
            const updated = await client.query(updateCourseQuery(data.join(','),argKeys,id),values)
            console.log(updated);
            if(req.file){
                await fs.unlinkSync(req.file.filename)
            }
            res.status(200).json({message:"Data updated successfully"})
           
        } catch (error) {
            console.log(error);
            res.json({error})
        }
        finally {
            await client.end()
         }
}