import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.routes.js"
import paymentRoutes from "./routes/payment.routes.js"
import { connectDB } from "./lib/db.js"
import cors from "cors"

dotenv.config()
const PORT=process.env.PORT || 3000
const app=express()

app.use(cors())
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes)
app.use("api/cart",cartRoutes)
app.use("api/payment",paymentRoutes)

app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`)
    connectDB()
})