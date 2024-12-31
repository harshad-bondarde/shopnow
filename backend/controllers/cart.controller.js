import Product from "../models/product.model.js";
export const addToCart=async(req,res)=>{
    try {
        const { productId }=req.body
        console.log(productId)
        const user=req.user;
        const existingItem=user.cartItems.find(item=>item._id==productId)
        if(existingItem){
            existingItem.quantity+=1
        }else{
            user.cartItems.push({
                _id:productId,
                quantity:1
            })
        }
        await user.save()
        res.status(200).json({
            cartItems:user.cartItems
        })
    } catch (error) {
        console.log("error while adding in the cart"+error.message)
        return res.status(500).json({
            message:error.message
        })
    }
}

export const removeAllFromCart=async(req,res)=>{
    try {
        const { productId }=req.body;
        const user=req.user;
        if(!productId){
            console.log("no ID")
            // user.cartItems=[]
        }else{
            user.cartItems=user.cartItems.filter(item=>item._id!=productId)
        }
        await user.save()
        res.status(200).json({
            message:"item deleted"
        })
    } catch (error) {
        console.log("error while removing product"+error.message)
        return res.status(500).json({
            message:error.message
        })
    }
}

export const updateQuantity=async(req,res)=>{
    try {
        const {id:productId}=req.params
        const { quantity }=req.body
        const user=req.user
        console.log(user)
        const existingItem=user.cartItems.find(item=>item._id==productId)
        // console.log(existingItem)
        if(existingItem){
            // if(quantity==0){
            //     user.cartItems=user.cartItems.filter(item=>item,productId!=productId)
            //     await user.save()
            //     return res.status(200).json({
            //         cartItems:user.cartItems
            //     })
            // }
            existingItem.quantity=quantity;
            await user.save()
            return res.status(200).json({
                cartItems:user.cartItems
            })
        }else{
            console.log("product not found")
            res.status(404).json({
                message:"product not found"
            })
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getCartProducts=async(req,res)=>{
    try {
        const OurCartItems=req.user.cartItems
        
        const cartItems=await Promise.all (
                OurCartItems.map(async(product)=>{
                    const thisProduct=await Product.findById(product._id)
                    if(thisProduct)
                        return {...thisProduct.toJSON(),quantity:product.quantity}
            })
        )

        return res.status(200).json({
            cartItems
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message:error.message
        })
    }
}


