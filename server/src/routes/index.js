import express from "express";
import { addCourse, deleteCourse, getAllCourses } from "../controller/index.js";
import { multerUploads } from "../middleware/multer.js";
const courseRouter = express.Router();

courseRouter.post('/course',multerUploads.single('thumbnail'),addCourse)
courseRouter.get('/courses',getAllCourses)
courseRouter.post('/coursesDete',deleteCourse)

export default courseRouter;