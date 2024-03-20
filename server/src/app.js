import express from "express";
import "dotenv/config";
import { createCoursesTable } from "./connection/config.js";
import courseRouter from "./routes/index.js";

const app = express()
const port = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

createCoursesTable();

app.use('/course',courseRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))