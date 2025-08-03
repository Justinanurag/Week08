import { Router } from "express";
import { email, success } from "zod";
import { adminModel, courseModel } from "../db.js";
export const adminRouter = Router();
import jwt from "jsonwebtoken";
import { fa } from "zod/v4/locales";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

//Signup End point
adminRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    await adminModel.create({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
    res.json({
      success: true,
      message: "Admin Signup Successfully...",
    });
    //handle duplicate user
  } catch (error) {
    return res.json({
      success: false,
      message: error.message || "Admin signup failed!!",
    });
  }
});

//Login End point
adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await adminModel.findOne({
    email: email,
    password: password,
  });
  try {
    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_ADMIN_SECRET,
        { expiresIn: "2d" }
      );
      //cookied can be added
      res.json({
        success: true,
        message: "Admin Login Successfully...",
        token: token,
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid Credentials Login Failed!!!",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminId = req.userId;
  const { title, description, imageUrl, price } = req.body;

  try {
    const course = await courseModel.create({
      title,
      description,
      imageUrl,
      price,
      creatorId: adminId,
    });

    return res.status(201).json({
      success: true,
      message: "Course added successfully",
      courseId: course._id,
    });
  } catch (error) {
    console.error("Error adding course:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
});


// Update a course
adminRouter.put('/course', adminMiddleware, async (req, res) => {
  try {
    const adminId = req.userId;
    const { title, description, imageUrl, price, courseId } = req.body;

    if (!title || !description || !imageUrl || !price || !courseId) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const updateResult = await courseModel.updateOne(
      { _id: courseId, creatorId: adminId },
      { $set: { title, description, imageUrl, price } }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found or you are not the creator',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
});

