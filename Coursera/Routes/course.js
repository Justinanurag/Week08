import { Router } from "express";
const courseRouter = Router();
courseRouter.post("/purche", (req, res) => {
  res.json({
    message: "purche end-point",
  });
});
courseRouter.get("/preview", (req, res) => {
  res.json({
    message: "courses end-point",
  });
});

export{courseRouter}
