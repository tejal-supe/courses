import axios from 'axios';
import config from "../config/apiConfig.json";

export const getAllCourseData = async() =>{
   const data =  await axios.get(config.baseUrl + config.getCourses)
   return data.data
}

export const deleteCourseService = async (id) => {
   const data = await axios.post(`${config.baseUrl + config.deleteCourse}/${id}`)
   return data.data
}