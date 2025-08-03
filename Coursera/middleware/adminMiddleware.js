import jwt from 'jsonwebtoken';
export const adminMiddleware =(req,res,next)=>{
    const token =  req.header.token;
    const decoded=jwt.verify(token,process.env.JWT_ADMIN_SECRET);
    if(decoded){
        req.userId=decoded.id;
        next();

    } else{
        return res.json({
            success:false,
            message:"You are not signned due to auth middleware of admin!!!"
        })
    }


}