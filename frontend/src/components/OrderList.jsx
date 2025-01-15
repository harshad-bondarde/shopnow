import React, { useEffect, useState } from 'react'
import { useGetAllOrders } from '../hooks/OrderHookes'
import MapOrders from './MapOrders'

const OrderList = () => {
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
        <>
            {orders.length>0 ?
                    <div>
                        {orders.map((order,key)=><MapOrders key={key} order={order}/>)}
                    </div>
                :
                    <div>
                        No Orders Present
                    </div>

            }
        </>
    )
}

export default OrderList
