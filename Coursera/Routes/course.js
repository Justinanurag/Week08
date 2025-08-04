import { Router } from "express";
import { userMiddleware } from "../middleware/userMiddleware.js";
import { courseModel, purchaseModel } from "../db.js";
import { success } from "zod";
const courseRouter = Router();
courseRouter.post("/purchase",userMiddleware, async (req, res) => {
  const userId = req.userId; // Make sure userMiddleware sets this correctly
  const { courseId } = req.body;

  // Validate required field
  if (!courseId) {
    return res.status(400).json({
      success: false,
      message: "courseId is required.",
    });
  }

  try {
    await purchaseModel.create({
      userId,
      courseId,
    });

    return res.status(201).json({
      success: true,
      message: "You have successfully bought the course!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to complete purchase.",
      error: error.message,
    });
  }
});

courseRouter.get("/preview", async(req, res) => {
  const courses=await courseModel.find({})
  res.json({
    success:true,
    message: "courses are displayed",
    courses
  });
});

export { courseRouter };
