export const addToCart=async(req,res)=>{
    try {
        const { productId }=req.body
        const user=req.user;
        const existingItem=user.cartItems.find(item=>item.productId==productId)
        if(existingItem){
            existingItem.quantity+=1
        }else{
            user.cartItems.push({
                productId:productId,
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
        const user=req.body;
        if(!productId){
            user.cartItems=[]
        }else{
            user.cartItems=user.cartItems.filter(item=>item.productId!=productId)
        }
        await user.save()
        res.status(200).json({
            cartItems:user.cartItems
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
        const existingItem=user.cartItems.find(item=>item.productId==productId)
        if(existingItem){
            if(quantity==0){
                user.cartItems=user.cartItems.filter(item=>item,productId!=productId)
                await user.save()
                return res.status(200).json({
                    cartItems:user.cartItems
                })
            }
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
        const cartItems=req.user.cartItems.populate("productId")
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


