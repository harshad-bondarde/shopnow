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
            state.cart=action.payload
        }
    }

})

export const { setCart }=cartSlice.actions
export default cartSlice.reducer