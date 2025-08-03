import jwt from "jsonwebtoken"
export const userMiddleware = (req, res, next) => {
    const token=req.header.token;
    const decoded=jwt.verify(token,process.env.JWT_USER_SECRET);
    if(decoded){
      req.userId=decoded.id
      next();
    } else{
      return res.json({
        status:false,
        messaage:"You are not signned in due to auth middleware of user !!!"
      })
    }
};