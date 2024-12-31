import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:'cart',
    initialState:{
        cartItems:[],
        total:0,
        subtotal:0
    },
    reducers:{
        setCart:(state,action)=>{
            state.cartItems=action.payload
        },
        
        setTotal:(state,action)=>{
            state.total=action.payload
        },
        
        setQuantity:(state,action)=>{
            const {_id,quantity}=action.payload
            state.cartItems=state.cartItems.map(item=>{
                if(_id==item._id){
                    return {
                        ...item,
                        quantity:quantity
                    }
                }else{
                    return item
                }
            })
        },  
        
    }

})

export const { setCart , setTotal }=cartSlice.actions
export default cartSlice.reducer