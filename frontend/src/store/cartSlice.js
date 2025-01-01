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
            let total=0;
            state.cartItems.forEach(item=>{
                total+=item.price*item.quantity
            })
            state.total=total
        },
        
        setTotal:(state,action)=>{
            state.total=action.payload
            let total=0;
            state.cartItems.forEach(item=>{
                total+=item.price*item.quantity
            })
            state.total=total
        },

        clearCart:(state,action)=>{
            state.cartItems=[]
            state.total=0;
        }
        
    }

})

export const { setCart , setTotal , clearCart }=cartSlice.actions
export default cartSlice.reducer