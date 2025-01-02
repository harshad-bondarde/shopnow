import React, { useEffect, useState } from 'react'
import { useGetFeaturedProducts } from '../hooks/ProductHookes'
import ProductCard from './ProductCard'
const FeaturedProducts = () => {
    const getFeaturedProducts=useGetFeaturedProducts()
    const [products,setProducts]=useState([])
    useEffect(()=>{
        const getProducts=async()=>{
            const result=await getFeaturedProducts()
            console.log(result)
            setProducts(result)
        }
        getProducts()
    },[])
    return (
        <div className='flex flex-col justify-center items-center gap-14'>   
            <div className='text-4xl font-semibold text-blue-400'>
                Featured
            </div>
            <div className='flex gap-6'>
                {products?.map((product,key)=><ProductCard key={key} product={product}/>)}
            </div>
        </div>
    )
}

export default FeaturedProducts
