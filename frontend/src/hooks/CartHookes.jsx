import {url} from "../url/url"
import axios from "axios"
import {useDispatch , useSelector} from "react-redux"
import toast from "react-hot-toast"
import { setCart } from "../store/cartSlice"
import { useEffect } from "react"

export const useGetCartItems=()=>{
    const dispatch=useDispatch()

    useEffect(()=>{
    const getItems=async()=>{
        try {
            const response=await axios.get(`${url}/cart/`,{
                headers:{
                    authorization:localStorage.getItem('token')
                }
            })
            console.log(response)
            if(response.status==200){
                dispatch(setCart(response.data.cartItems))
            }
        } catch (error) {
            console.log(error)
            if(error.response.status==401){
                toast.error(error.response.data.message)
                return
            }
            toast.error("Error while getting Cart Items")
        }
    }
        getItems()
    },[dispatch])
}

export const useAddToCart=()=>{
    const dispatch=useDispatch()
    const addToCart=async(product_id)=>{
        try {
            const response=await axios.post(`${url}/cart/`,{product_id},{
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            console.log(response)
            if(response.status==200){
                dispatch(setCart(response.data.cartItems))
                toast.success("Product Added to Cart")
            }
        } catch (error) {
            console.log(error)
            toast.error("Error while adding in the cart")
        }

    }
    return addToCart
}