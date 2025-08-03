import { Router } from "express";
const courseRouter = Router();
courseRouter.post("/purchse", (req, res) => {
  res.json({
    message: "purchse end-point",
  });
});
courseRouter.get("/preview", (req, res) => {
  res.json({
    message: "courses end-point",
  });
});

export{courseRouter}
