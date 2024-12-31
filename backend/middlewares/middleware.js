import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const userMiddleware=async (req,res,next)=>{
    const auth=req.headers.authorization
    if(!auth){
        // console.log("not logged in")
        return res.status(401).json({
            message:"unauthorised access..."
        })
    }
    const token=auth
    try{ 
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.userId){
            const user=await User.findById(decoded.userId).select("-password")
            if(!user){
                return res.status(401).json({
                    message:"user not found"
                })
            }
            req.user=user
            next()
        }else{
            return res.status(401).json({
                message:"User not logged in ..."
            })
        }
    }catch(e){
        console.log(e)
        return res.status(503).json({
            message:"internal server error"
        })
    }
}

export const adminMiddleware=async (req,res,next)=>{
    if(req.user && req.user.role=='admin'){
        next()
    }else{
        return res.status(401).json({
            message:"Access denied admin only"
        })
    }
}