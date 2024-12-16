import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import productReducer from "./productsSlice"
import cartSlice from "./cartSlice"

const store=configureStore({
    reducer:{
        user:userReducer,
        product:productReducer,
        cart:cartSlice
    }
})

export default store