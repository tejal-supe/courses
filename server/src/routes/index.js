import express from "express";
import { addCourse, deleteCourse, getAllCourses, updateCourseById } from "../controller/index.js";
import { multerUploads } from "../middleware/multer.js";
const courseRouter = express.Router();

courseRouter.post('/course',multerUploads.single('thumbnail'),addCourse)
courseRouter.get('/courses',getAllCourses)
courseRouter.post('/course/:id',deleteCourse)
courseRouter.patch('/course/:id',multerUploads.single('thumbnail'),updateCourseById)
courseRouter.get('/filter-by-authors',getAllCourses)

export default courseRouter;