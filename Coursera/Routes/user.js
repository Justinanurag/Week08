import { Router } from "express";
const userRouter=Router();

    userRouter.post('/signup',(req,res)=>{
   res.json({
    message:'signup end-point'
   })
});
userRouter.post('/login',(req,res)=>{
    res.json({
    message:'login end-point'
   })
});
userRouter.get('/purches',(req,res)=>{
    res.json({
    message:'purches end-point'
   })
}); 

export{userRouter};