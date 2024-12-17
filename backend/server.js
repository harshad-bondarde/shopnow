import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/product.route.js"
import { connectDB } from "./lib/db.js"

dotenv.config()

const PORT=process.env.PORT || 3000
const app=express()
 
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes)

app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`)
    connectDB()
})