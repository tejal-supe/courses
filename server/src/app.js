import express from "express";
import "dotenv/config";
import cors from "cors";
import { createCoursesTable } from "./connection/config.js";
import courseRouter from "./routes/index.js";

const app = express()
const port = process.env.PORT
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

createCoursesTable();

app.use('/',courseRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))