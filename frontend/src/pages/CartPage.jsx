import React, { useEffect } from 'react'
import { useGetCartItems } from '../hooks/CartHookes'
import { useSelector , useDispatch } from 'react-redux'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import RecommendedProducts from '../components/RecommendedProducts'
import Summary from '../components/Summary'

const CartPage = () => {
    const {cartItems}=useSelector(state=>state.cart)

    return (
        <div className='p-10'>
            <div className='flex flex-col space-y-3'>
                { cartItems.length==0 ? 
                        <>
                                <div className='flex flex-col items-center justify-center space-y-4 py-16'
                >
                                    <ShoppingCart className='h-24 w-24 text-gray-300' />
                                    <h3 className='text-2xl font-semibold '>Your cart is empty</h3>
                                    <p className='text-gray-400'>Looks like you {"haven't"} added anything to your cart yet.</p>
                                    <Link
                                        className='mt-4 rounded-md bg-blue-500 px-6 py-2 text-white transition-colors'
                                        to='/'
                                    >
                                        Start Shopping
                                    </Link>
                                </div>
                        </>
                    :
                        <div className='flex flex-col space-y-8'>
                            <div className='flex justify-between'>
                                <div className='space-y-3 '>
                                    {cartItems.map((item,key)=><CartItem item={item} key={key}/>)}
                                </div>
                                <div className='m-14 w-fit'>
                                    <Summary/>
                                </div>
                            </div>
                            {
                                cartItems.length>0 && (<RecommendedProducts/>)
                            }
                        </div>
                }
            </div>
        </div>
    )
    }

export default CartPage
