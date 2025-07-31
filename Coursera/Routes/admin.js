import { Router } from "express";
 export const adminRouter=Router();

     adminRouter.post('/signup',(req,res)=>{
    res.json({
     message:'signup end-point'
    })
 });
 adminRouter.post('/login',(req,res)=>{
     res.json({
     message:'login end-point'
    })
 });
 adminRouter.post('/addCourse',(req,res)=>{
    res.json({
        success:true,
        message:"Course added"
    })
 })