import React, { useEffect } from 'react'
import { useGetCartItems } from '../hooks/CartHookes'
import { useSelector , useDispatch } from 'react-redux'

const CartPage = () => {
    useGetCartItems()
    const {cartItems}=useSelector(state=>state.cart)
    console.group(cartItems)
    return (
        <div>
            
        </div>
    )
    }

export default CartPage
