import axios from 'axios';
import config from "../config/apiConfig.json";

export const getAllCourseData = async() =>{
   const data =  await axios.get(config.baseUrl + config.getCourses)
   return data.data
}
