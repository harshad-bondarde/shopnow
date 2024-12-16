import User from "../models/user.model.js"
import bcrypt from "bcrypt"

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
        const hash=await bcrypt.compare(password,salt)
        const user=await User.create({
            name,
            email,
            password:hash
        })
        res.status(200).json({
            user,
            message:"user created successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:error.message
        })
    }
}
export const login=async (req,res)=>{

}
export const logout=async (req,res)=>{

}