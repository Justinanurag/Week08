import { Router } from "express";
import { userModel } from "../db.js";
import { success } from "zod";
export const userRouter = Router();
import jwt from "jsonwebtoken";


// Signup Route
userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body; //add zod validation and hash password
  //Add node mailer to send mail
  try {
    await userModel.create({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
    res.json({
      success: true,
      message: "SignUp Successfully!",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
});

// Login Route
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email: email,
    password: password,
  });
  try {
    if (user) {
      const token=jwt.sign({
        id:user._id
      },process.env.JWT_USER_SECRET,{expiresIn:"2d"});
      //do cookies logic here
      res.json({
        success: true,
        message: "Login Successfully!",
        token:token
      });
    } else{
      return res.json({
        success:false,
        message:"Invalid Credentials!!! "
      })
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
});
userRouter.post('/logout',(req,res)=>{
// add logout function 
})

userRouter.get("/purchase", (req, res) => {
  res.json({
    message: "purchase end-point",
  });
});
