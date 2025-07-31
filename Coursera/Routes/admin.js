import { Router } from "express";
 export const adminRouter=Router();
 adminRouter.post('/addCourse',(req,res)=>{
    res.json({
        success:true,
        message:"Course added"
    })
 })