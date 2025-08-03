import { Router } from "express";
import { email, success } from "zod";
import { adminModel } from "../db.js";
 export const adminRouter=Router();
 import jwt from "jsonwebtoken"
import { fa } from "zod/v4/locales";

     adminRouter.post('/signup',async(req,res)=>{
        const {email,password,firstName,lastName}=req.body;
        try {
            await adminModel.create({
                email:email,
                password:password,
                firstName:firstName,
                lastName:lastName
            });
            res.json({
                success:true,
                message:"Admin Signup Successfully...",
            });
            //handle duplicate user
        } catch (error) {
            return res.json({
                success:false,
                message:error.message||"Admin signup failed!!"
            });
        }
 });
 adminRouter.post('/login',async(req,res)=>{

    const {email,password}=req.body;
    const user=await adminModel.findOne({
        email:email,
        password:password
    });
    try {
        if(user){
            const token=jwt.sign({
                id:user._id

            },process.env.JWT_ADMIN_SECRET,{expiresIn:"2d"});
            //cookied can be added 
            res.json({
                success:true,
                message:"Admin Login Successfully...",
                token:token
            })
        } else{
            return res.json({
                success:false,
                message:"Invalid Credentials Login Failed!!!"
            })
        }
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
 });
 adminRouter.post('/addCourse',(req,res)=>{
    res.json({
        success:true,
        message:"Course added"
    })
 })