import express from "express"
import { userMiddleware } from "../middlewares/middleware.js"
import { getCoupon, validateCoupon } from "../controllers/coupon.controller.js"
const router=express.Router()

router.get("/",userMiddleware,getCoupon)
router.get("/validate",userMiddleware,validateCoupon)

export default router