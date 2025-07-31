import { Router } from "express";
export const userRouter = Router();

// Signup Route
userRouter.post('/signup', (req, res) => {
  res.json({
    message: 'signup end-point'
  });
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
