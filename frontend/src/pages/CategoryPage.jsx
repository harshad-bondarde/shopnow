import React, { useEffect, useState } from 'react'
import { useGetProductsByCategory } from '../hooks/ProductHookes'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useSelector } from 'react-redux'
import { Loader } from 'lucide-react'
const CategoryPage = () => {
  const [categoryProducts,setCategoryProducts]=useState([])
  const { productLoader }=useSelector(state=>state.product)

  const {category}=useParams()

  const getCategoryProducts=useGetProductsByCategory()
  useEffect(()=>{
    getCategoryProducts(category,setCategoryProducts)
  },[useGetProductsByCategory])

  return (
    <div className='min-h-screen'> 
      <div className='max-w-screen px-4 py-16 flex flex-col items-center'>
        
        <div className='text-3xl font-semibold text-blue-400 text-center '>
          {category.charAt(0).toUpperCase()}{category.slice(1)}
        </div>

        { !productLoader ? 
            <div className='mt-20'>  
              {categoryProducts.length==0 ?
                      <div className='text-2xl font-semibold text-gray-400 text-center '>
                        No Products Found
                      </div>
                  :
                      <div className='grid grid-cols-4 gap-x-2'>
                        {categoryProducts?.map((product,key)=><ProductCard key={key} product={product}/>)}
                      </div>
              }
            </div> 
          :
            <div className='mt-20'>
              <Loader className='animate-spin'/>
            </div>
        }
      </div>
    </div>
  )
}

export default CategoryPage
