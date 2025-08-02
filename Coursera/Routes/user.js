import { Router } from "express";
import {userModel} from "../db"
import { success } from "zod";
export const userRouter = Router();

// Signup Route
userRouter.post('/signup', async (req, res) => {
  const{email,password,firstName,LastName}=req.body;//add zod validation and hash password
  try {
      await userModel.create({
    email:email,
    password:password,
    firstName:firstName,
    lastName:lastName
  })
  res.json({
    success:true,
    message: 'SignUp Successfully!'
  });
    
  } catch (error) {
    return res.json({
      success:false,
      message:error.message
    })
  }
});

// Login Route
userRouter.post('/login', (req, res) => {
  res.json({
    message: 'login end-point'
  });
});

userRouter.get('/purchase', (req, res) => {
  res.json({
    message: 'purchase end-point'
  });
});
