import express from "express";
import { userRouter } from "./Routes/user.js";
import { courseRouter } from "./Routes/course.js";

const port=3000;
const app =express();
app.use(express.json());


app.use('/user',userRouter);
app.use('/course',courseRouter);
app.use('/admin',admin);

app.listen(port,()=>{
    console.log(`Server is started at port ${port}`)
})