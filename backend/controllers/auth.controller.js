import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signup=async (req,res)=>{
    const { email , password , name}=req.body;
    console.log(req.body)
    const userExists=await User.findOne({ email }) 
    try {
        if(userExists){
            return res.status(400).json({
                message:"User already Exists"
            })
        }
        const salt=await bcrypt.genSaltSync(10)
        const hash=await bcrypt.hash(password,salt)
        const user=await User.create({
            name,
            email,
            password:hash
        })
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET)
        res.status(200).json({
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            },
            token,
            message:"User created successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:error.message
        })
    }
}
export const login=async (req,res)=>{
    const { email , password }=req.body;
    try {
        const user=await User.findOne({ email })
        console.log(user)
        if(!(user && (await bcrypt.compare(password,user.password))))
            return res.status(401).json({
                message:"user not found"
            })
        
            const token=jwt.sign({userId:user._id},process.env.JWT_SECRET)
            return res.status(200).json({
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role
                },
                token,
                message:"Logged in successfully"
            })
        
    } catch (error) {
        return res.status(500).json({
            message:"Something went wrong..."
        })
        console.log(error.message)
    }
}

