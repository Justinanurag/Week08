import { Router } from "express";
import { userMiddleware } from "../middleware/userMiddleware";
import { courseModel, purchaseModel } from "../db";
import { success } from "zod";
const courseRouter = Router();
courseRouter.post("/purchase", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const coursesId = req.body.coursesId;
//should check for that the user has actually paid the price or not

  try {
    await purchaseModel.create({
      userId,
      coursesId,
    });

    res.json({
      message: "You have successfully bought the course!!",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
});
courseRouter.get("/preview", async(req, res) => {
  const course=await courseModel({})
  res.json({
    success:true,
    message: "courses are displayed",
    course
  });
});

export { courseRouter };
