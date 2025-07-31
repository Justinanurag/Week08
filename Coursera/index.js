import express from "express";
import { userRouter } from "./Routes/user.js";
import { courseRouter } from "./Routes/course.js";
import{adminRouter} from './Routes/admin.js'
import dotenv from "dotenv";
import { connectDB } from "./db.js";
const port=3000;
const app =express();
app.use(express.json());
dotenv.config();

await connectDB();


app.use('/user',userRouter);
app.use('/course',courseRouter);
app.use('/admin',adminRouter);

app.listen(port,()=>{
    console.log(`Server is started at port ${port}`)
})