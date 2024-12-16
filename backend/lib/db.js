import mongoose from "mongoose"

export const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB connnected : ${conn.connection.host}`)
 
    } catch (error) {
        console.log("error while connecting to database "+error)
    }
}