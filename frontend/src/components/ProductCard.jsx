import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { IndianRupeeIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useAddToCart } from "../hooks/CartHookes.jsx"
import toast from 'react-hot-toast'

const ProductCard = ({product}) => {
    const {authUser}=useSelector(state=>state.user)
    const addToCart=useAddToCart()
    const AddToCart=async(product_id)=>{
        if(!authUser){
            toast.error("Please Login To Add Product")
            return;
        }
        addToCart(product_id)
    }
    return (
        <div className='flex flex-col gap-1 w-full overflow-hidden rounded-lg border p-2 border-gray-700 shadow-lg'>
            <div className=' rounded-xl items-center '>
                <img className='p-1 h-60 w-60' src={product?.image} alt="product image" />
            </div>
            <div className='text-sm text-gray-300 font-semibold'>
                {product?.name}
            </div>
            <div className='flex text-blue-500 font-bold'>
                <IndianRupeeIcon size={17} className='mt-1'/>{product?.price}
            </div>
            <button onClick={()=>AddToCart(product?._id)} className='flex w-full items-center bg-blue-600 border-blue-400 rounded-xl text-center p-2 font-medium shadow-md cursor-pointer border-2' >
                <ShoppingCart className='ml-12 mr-3' size={19}/>
                Add to Cart
            </button>
        </div>
        
    )
}

export default ProductCard
