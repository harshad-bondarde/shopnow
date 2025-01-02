import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IndianRupee, Loader } from 'lucide-react'
import { Link } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js"
import { url } from '../url/url'
import axios from 'axios'
import { clearCart } from '../store/cartSlice'

const stripePromise=loadStripe("pk_test_51QXgSbBxaf66OiPKxN3Bk9YAzARe2VWPhrVUmmzm8FzA7YheP4Pwf5cOn6wrs7AT15eYiGkTL1BDHYlPnH9VLHvj00HmAV40lD")

const Summary = () => {
    const {cartItems , total }=useSelector(state=>state.cart)
    const [quantity,setQuantity]=useState(0)
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        let q=0;
        cartItems.forEach(item => {
            q+=item.quantity
        });
        setQuantity(q);
    },[cartItems])


    const HandlePayment= async ()=>{
        const stripe=await stripePromise
        try { 
                setLoading(true)
                const response=await axios.post(`${url}/payment/createCheckoutSession`,{
                    products:cartItems
                },{
                    headers:{
                        authorization:localStorage.getItem('token')
                    }
                })
                const session=response.data
                const result=await stripe.redirectToCheckout({
                    sessionId:session.id
                })
                console.log(response)

                if(result.error){
                    console.log(error)
                }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }

    }

  return (
    <div className='border-2 p-7 border-gray-700 text-gray-200 gap-7 flex flex-col bg-gray-700 rounded-lg w-96'>
        <div className='text-xl font-bold text-blue-500 '>
            Order Summary 
        </div>
        <div className='flex justify-between text-gray-300'>
            <div  className='font-semibold space-y-2'>
                <div>
                    Total Quantity : 
                </div>
                <div >
                    Total Amount : 
                </div>
            </div>
            <div className='space-y-2 items-center flex flex-col'>
                <div>
                    {quantity}
                </div>
                <div className='flex items-center text-green-500 font-semibold'>
                    <IndianRupee size={18}/>{total}
                </div>
            </div>
        </div>
        <button onClick={()=>HandlePayment()} className='flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-700'>
            {!loading ?    
                    <div>    
                        Proceed To Payment
                    </div>
                :
                    <>
                        <Loader className='animate-spin'/>
                    </>
            }
        </button>
        <div className='text-blue-500 underline text-center'>
            <Link to={"/"}>
                Return To Shopping 
            </Link>
        
        </div>
    </div>
  )
}

export default Summary
