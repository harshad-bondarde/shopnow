import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.routes.js"
import paymentRoutes from "./routes/payment.routes.js"
import orderRoutes from "./routes/orders.routes.js"
import { connectDB } from "./lib/db.js"
import cors from "cors"
import path from "path"

dotenv.config()
const PORT=process.env.PORT || 3000
const app=express()

const __dirname=path.resolve()

app.use(cors())
app.use(express.json({ limit:'10mb' }))

app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/payment",paymentRoutes)
app.use("/api/orders",orderRoutes)

if(process.env.NODE_ENV=='production'){
    app.use(express.static(path.join(__dirname,"/frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}

app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`)
    connectDB()
})