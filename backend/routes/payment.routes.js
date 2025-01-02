import express from "express"
import { userMiddleware } from "../middlewares/middleware.js"
import dotenv from "dotenv"
import Stripe from "stripe"
import Order from "../models/order.model.js"

dotenv.config()
const router=express.Router()

router.post("/createCheckoutSession",userMiddleware,async(req,res)=>{
    try {
        const { products }=req.body
        if(!products || products.length==0)
            return res.status(400).json({ error:"invalid product format" })
        
        let totalAmount=0;
        const lineItems=products.map((product)=>{
            const amount=Math.round(product.price * 100) //in cents
            totalAmount+=amount*product.quantity;
            
            return {
                price_data:{
                    currency:"inr",
                    product_data:{
                        name:product.name,
                        images:[product.image]
                    },
                    unit_amount:amount,
                },
                quantity:product.quantity || 1
            }
        })

        const stripe= new Stripe(process.env.STRIPE_SECRET_KEY)
        const session=await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",
            success_url:`${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url:`${process.env.CLIENT_URL}/cancel`,
            metadata:{
                userId:JSON.stringify(req.user._id), //metadata stored in form of string 
                products:JSON.stringify(
                            products.map((p)=>({
                                id:p._id,
                                quantity:p.quantity,
                                price:p.price
                            }))
                )
            }
        })

        res.status(200).json({
            id:session.id,
            totalAmount:totalAmount/100
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:error.message
        })
    }
})

router.post("/checkoutSuccess",async (req,res)=>{
        try {
            const { sessionId }=req.body;
            const stripe= new Stripe(process.env.STRIPE_SECRET_KEY)
            const session=await stripe.checkout.sessions.retrieve(sessionId)
            console.log(session.metadata)
            let products;
            try {
                products = JSON.parse(session.metadata.products); 
            } catch (error) {
                throw new Error("Failed to parse products metadata: " + error.message);
            }
            const newOrder=new Order({
                userId:JSON.parse(session.metadata.userId),
                products:products.map((product)=>({
                    productId:product.id,
                    quantity:product.quantity,
                    price:product.price
                })),
                totalAmount:session.amount_total/100,
                stripeSessionId:sessionId
            })

            await newOrder.save()
            res.status(200).json({
                success:true,
                message:"Payment Successful Order created",
                orderId:newOrder._id
            })
        } catch (error) {
            console.log(error)
            // console.log("error while checkout success",error.message)
            return res.status(500).json({
                error:error.message
            })
        }
    }
)

export default router