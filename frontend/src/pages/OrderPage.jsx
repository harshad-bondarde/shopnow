import React, { useEffect, useState } from 'react'
import { useGetAllOrders } from '../hooks/OrderHookes'
import MapOrders from '../components/MapOrders'

const OrderPage = () => {
    const [orders,setOrders]=useState([])
    useEffect(()=>{
        const getOrders=async()=>{
            const allorders=await useGetAllOrders()
            setOrders(allorders)
        }
        getOrders()
    },[])
    console.log(orders)
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='mt-24 flex flex-col items-center'>
                <div className='text-4xl font-bold text-blue-300 mb-12'>
                    Your Orders
                </div>   

                <table className=' min-w-full divide-y divide-gray-400 border-gray-400 '>
                    <thead className='bg-gray-700'>
                        <tr className=''>
                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                        >
                            Date
                        </th>
                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                        >
                            Total Price
                        </th>
                        <th
                            scope='col'
                            className='px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                        >
                            Products
                        </th>

                        
                        </tr>
                    </thead>
                    
                            { <tbody className='bg-gray-800 divide-y'>
                                {orders.map((order)=>(
                                    <tr key={order._id}>
                                        
                                        <td className='px-4 py-4'>
                                        {new Date(order?.createdAt).toLocaleString().split(',')[0]}
                                        </td>

                                        <td className='text-center'>
                                            {order.totalAmount}
                                        </td>

                                        <td className='text-center'>
                                            {order.products.length}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                            }

                </table>

                {/* {orders?.length>0 && orders.map((order,key)=><MapOrders key={key} order={order}/>)} */}
            
            </div>
        </div>
  )
}

export default OrderPage
