import Order from "../models/order.model.js"

export const getAllOrders=async(req,res)=>{
    const userId=req.user._id
    try {
        const allOrders=await Order.find({userId}).sort({createdAt:-1})
        return res.status(200).json({
            orders:allOrders
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"error while getting orders "+error
        })
    }
}