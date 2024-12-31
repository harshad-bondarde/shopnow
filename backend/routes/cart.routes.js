import express from "express"
import { addToCart, getCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cart.controller.js"
import { userMiddleware } from "../middlewares/middleware.js"
const router=express.Router()

router.get("/",userMiddleware,getCartProducts)
router.post("/", userMiddleware , addToCart)
router.post("/delete", userMiddleware , removeAllFromCart)
router.put("/:id",userMiddleware,updateQuantity)

export default router