import exrpess from "express"
import { adminMiddleware, userMiddleware } from "../middlewares/middleware.js"
import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts, getProductsByCategory, getRecommendedProducts, toggleProductFeature } from "../controllers/product.controller.js"
const router=exrpess.Router()

router.get("/",userMiddleware,adminMiddleware,getAllProducts)
router.get("/featured",getFeaturedProducts)
router.get("/category/:category",getProductsByCategory)
router.patch("/category/:category",toggleProductFeature)
router.post("/",userMiddleware,adminMiddleware,createProduct)
router.post("/:id",userMiddleware,adminMiddleware,deleteProduct)
router.get("/recommendations", getRecommendedProducts) 
export default router