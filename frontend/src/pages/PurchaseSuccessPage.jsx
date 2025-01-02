import React, { useEffect } from 'react'
import { useEmptyCart } from '../hooks/CartHookes'
import axios from 'axios'
import { url } from '../url/url'
import toast from 'react-hot-toast'
import { ArrowRight, CheckCircle, HandHeart } from 'lucide-react'
import { Link } from 'react-router-dom'

const PurchaseSuccessPage = () => {
    const sessionId=new URLSearchParams(window.location.search).get("session_id")
    const emptyCart=useEmptyCart()
    useEffect(()=>{
        const handleSuccess=async()=>{
            try {
                const response=await axios.post(`${url}/payment/checkoutSuccess`,{
                    sessionId
                })
                console.log(response.data)
                toast.success("Order Created")
                emptyCart()
            } catch (error) {
                console.log(error)
            }
        }
        if(sessionId)   handleSuccess()
    },[])
    return (
        <div className='h-screen flex items-center justify-center px-4'>
			

			<div className='max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10'>
				<div className='p-6 sm:p-8'>
					<div className='flex justify-center'>
						<CheckCircle className='text-blue-400 w-16 h-16 mb-4' />
					</div>
					<h1 className='text-2xl sm:text-3xl font-bold text-center text-blue-400 mb-2'>
						Purchase Successful!
					</h1>

					<p className='text-gray-300 text-center mb-2'>
						Thank you for your order. {"We're"} processing it now.
					</p>
					<div className='bg-gray-700 rounded-lg p-4 mb-6'>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-gray-400'>Estimated delivery</span>
							<span className='text-sm font-semibold text-blue-400'>3-5 business days</span>
						</div>
					</div>

					<div className='space-y-4'>
						<button
							className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4
             rounded-lg transition duration-300 flex items-center justify-center'
						>
							<HandHeart className='mr-2' size={18} />
							Thanks for trusting us!
						</button>
						<Link
							to={"/"}
							className='w-full bg-gray-700 hover:bg-gray-600 text-blue-400 font-bold py-2 px-4 
            rounded-lg transition duration-300 flex items-center justify-center'
						>
							Continue Shopping
							<ArrowRight className='ml-2' size={18} />
						</Link>
					</div>
				</div>
			</div>
		</div>

    )
}

export default PurchaseSuccessPage
