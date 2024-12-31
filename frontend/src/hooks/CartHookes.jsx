import {url} from "../url/url"
import axios from "axios"
import {useDispatch , useSelector} from "react-redux"
import toast from "react-hot-toast"
import { setCart , setTotal } from "../store/cartSlice"
import { useEffect } from "react"

export const useGetCartItems=()=>{
    const dispatch=useDispatch()

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
                let total=0;
                const items=response.data.cartItems
                items.forEach(element => {
                    
                });

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

    return getItems
}


export const useAddToCart=()=>{
    const dispatch=useDispatch()
    const getItems=useGetCartItems()
    const addToCart=async(product_id)=>{
        try {
            const response=await axios.post(`${url}/cart/`,{productId:product_id},{
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            console.log(response)
            if(response.status==200){
                dispatch(setCart(response.data.cartItems))
                getItems()
                toast.success("Product Added to Cart")
            }
        } catch (error) {
            console.log(error)
            toast.error("Error while adding in the cart")
        }

    }
    return addToCart
}

export const useDeleteFromCart=()=>{
    const dispatch=useDispatch()
    const {cartItems}=useSelector(state=>state.cart)
    const deletethis=async(productId)=>{
        try {
            const response=await axios.post(`${url}/cart/delete`,{
                productId
            },{
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            console.log(response)
            if(response.status==200){
                const newItems=cartItems.filter((item)=>{
                    return item._id!=productId
                })
                dispatch(setCart(newItems))
                toast.success("Item Deleted")
            }else{
                toast.error("Error while deleting the Product")
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || "Error while deleting the Product")
        }
    }
    return deletethis
}

export const useUpdateQuantity=()=>{
    const dispatch=useDispatch()
    const { cartItems }=useSelector(state=>state.cart)
    const deleteThis=useDeleteFromCart()
    const update=async (product_id,quantity)=>{
        if(quantity==0){
            deleteThis(product_id)
            return
        }


        try {
            const response=await axios.put(`${url}/cart/${product_id}`,{
                quantity
            },{
                headers:{
                    authorization:localStorage.getItem("token")
                }
            });
            console.log(response)
            if(response.status==200){
                const updatedItems=cartItems.map((item)=>{
                    if(item._id==product_id){
                        return {
                            ...item,
                            quantity:quantity
                        }
                    }else{
                        return item
                    }
                })
                dispatch(setCart(updatedItems))
            }else{
                console.log(response)
                toast.error("Error while Updating Quantity")
            }
        
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || "Error while Updating Quantity")
        }
    }

    return update
}