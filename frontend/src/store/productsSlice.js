import { createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
    name:"product",
    initialState:{
        products:[],
        productLoader:false,
    },
    reducers:{
        setProduct:(state,action)=>{
            state.products.push(action.payload)
        },
        setAllproducts:(state,action)=>{
            state.products=action.payload
        },
        setProductLoader:(state,action)=>{
            state.productLoader=action.payload
        }
    }
})

export const { setProduct , setAllproducts ,setProductLoader }=productSlice.actions
export default productSlice.reducer