import { Router } from "express";
import { courseModel, purchaseModel, userModel } from "../db.js";
import { success } from "zod";
export const userRouter = Router();
import jwt from "jsonwebtoken";
import { userMiddleware } from "../middleware/userMiddleware.js";

 //add zod validation and hash password
  //Add node mailer to send mail
// Signup Route (Assuming you're using Express)
userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Validate input fields
  if (!email || !password || !firstName || !lastName) {
    return res.json({
      success: false,
      message: "Email, password, firstName, and lastName are required!",
    });
  }

  try {
    // Create user
    await userModel.create({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });

    return res.json({
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

userRouter.get("/purchase",userMiddleware,async (req, res) => {
  const userId=req.userId;
const purchases= await purchaseModel.find({
  userId,
})
const courseIds = [
  ...new Set(purchases.map(p => p.courseId.toString()))
];

const courseData = await courseModel.find({
  _id: { $in: courseIds }
});


  res.json({
    success:true,
    message: "Course purchased Successfully!!",
    purchases,
    courseData
  });
});
