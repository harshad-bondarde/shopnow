import express from "express"
import { adminMiddleware, userMiddleware } from "../middlewares/middleware.js";
import { getAllOrders } from "../controllers/order.controller.js";
const router=express.Router();

router.get("/getAllOrders",userMiddleware,getAllOrders)
// router.get("/getMyOrders")

export default router