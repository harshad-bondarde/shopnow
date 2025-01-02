import React, { useState } from 'react'
import { Loader, ShoppingCart } from 'lucide-react'
import { IndianRupeeIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useAddToCart } from "../hooks/CartHookes.jsx"
import toast from 'react-hot-toast'

const ProductCard = ({product}) => {
    const {authUser}=useSelector(state=>state.user)
    const [loading,setLoading]=useState(false)
    const addToCart=useAddToCart()
    const AddToCart=async(product_id)=>{
        if(!authUser){
            toast.error("Please Login To Add Product")
            return;
        }
        addToCart(product_id,setLoading)
    }
    return (
        <div className='flex flex-col gap-1 w-full overflow-hidden rounded-lg border p-4 border-gray-700 shadow-lg'>
            <div className='rounded-xl items-center '>
                <img className='p-1 h-60 w-60' src={product?.image} alt="product image" />
            </div>
            <div className='text-lg text-gray-300 font-semibold ml-1'>
                {product?.name.charAt(0).toUpperCase()}{product?.name.slice(1)}
            </div>
            <div className='flex text-blue-500 font-bold ml-1 mb-1'>
                <IndianRupeeIcon size={17} className='mt-1'/>{product?.price}
            </div>
            <button disabled={loading} onClick={()=>AddToCart(product?._id)} className='flex w-full justify-center items-center bg-blue-600 border-blue-400 rounded-xl text-center p-2 font-medium shadow-md cursor-pointer border-2' >
                {!loading ?
                        <div className='flex '>
                            <ShoppingCart className=' mr-3' size={19}/>
                            Add to Cart
                        </div>
                    :
                    <>
                        <Loader className='animate-spin'/>
                    </>
                }
            </button>
        </div>    
    )
}

export default ProductCard
