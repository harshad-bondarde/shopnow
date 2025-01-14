import React, { useEffect, useState } from 'react'
import { useGetAllOrders } from '../hooks/OrderHookes'

const AdminOrderList = () => {
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
        <div>
            
        </div>
    )
}

export default AdminOrderList
