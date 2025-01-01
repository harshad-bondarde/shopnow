import React, { useEffect, useState } from 'react'
import { url } from '../url/url'
import axios from "axios"
import ProductCard from './ProductCard'
import { Loader } from 'lucide-react'
const RecommendedProducts = () => {
    const [products,setProducts]=useState([])
    const [loading,setLoading]=useState(false) 
    useEffect(()=>{
        const getProducts=async ()=>{
            try {
                setLoading(true)
                const response=await axios.get(`${url}/products/recommendations`)
                if(response.status==200)
                    setProducts(response.data.products)
                else{
                    console.log(response)
                }
            } catch (error) {
                console.log(error)        
            }finally{
                setLoading(false)
            }

        }
        getProducts()
    },[])
    return (
        <div >
            <div className='mb-5 ml-4 text-xl font-semibold text-blue-500'>
                Recommended Products
            </div>
            <div >
                { !loading ?
                    <div className='grid grid-cols-4 gap-3 '>
                        {products.map((product,key)=>(<ProductCard key={key} product={product}/>))}
                    </div>    
                    :
                    <div className='flex flex-col items-center mt-20'>
                        <Loader className='animate-spin '/>
                    </div>
                }
            </div>
        </div>
    )
}

export default RecommendedProducts
