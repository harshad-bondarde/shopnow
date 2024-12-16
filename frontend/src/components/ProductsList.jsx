import React from 'react'
import { Trash , Star } from "lucide-react"
import { useDeleteProduct, useGetAllProducts , useToggleProductFeature } from '../hooks/ProductHookes'
import { Loader } from 'lucide-react'

const ProductsList = () => {
  const { products , productLoader }=useGetAllProducts()
  console.log(products)
  console.log(productLoader)
  const toggleProductFeature=useToggleProductFeature()
  const toggle=async(product_id)=>{
    toggleProductFeature(product_id)
  }
  const deleteProduct=useDeleteProduct()
  const deleteThis=async(product_id)=>{
    deleteProduct(product_id)
  }
  return (
    <div className='mt-6'>
      <table className=' min-w-full divide-y divide-gray-400 border-gray-400 '>
          <thead className='bg-gray-700'>
            <tr className=''>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
              >
                Product
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
              >
                Price
              </th>
              <th
                scope='col'
                className='px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
              >
                Category
              </th>

              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
              >
                Featured
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
              >
                Actions
              </th>
            </tr>
          </thead>
          {
            productLoader ?
                
                  <>
                    <Loader className='animate-spin'/>
                  </>
                :
                  <tbody className='bg-gray-800 divide-y'>
                    {products.map((product)=>(
                        <tr key={product._id}>
                            
                            <td className='px-4 py-4'>
                              <div className='flex items-center gap-3 '>
                                <div>
                                  <img 
                                    className='h-10 w-10 rounded-full object-cover'
                                    src={product.image} 
                                    alt={product.name} />
                                </div>
                                <div className='text-sm font-medium text-gray-300'>
                                  {product.name}
                                </div>
                              </div>
                            </td>

                            <td className='text-center'>
                              <div className='text-sm text-gray-300'>
                                {product.price}
                              </div>
                            </td>

                            <td className='text-center'>
                              <div className='text-sm text-gray-300'>
                                {product.category}
                              </div>
                            </td>

                            <td className='text-center'>
                                <button 
                                  onClick={()=>toggle(product._id)}
                                  className={`p-1 rounded-full ${product.isFeatured ? `bg-yellow-400 text-gray-900`:`bg-gray-600 text-gray-300`}
                                              hover:bg-yellow-500 transition-colors duration-200`}
                                >
                                  <Star className='h-5 w-5'/>
                                </button>
                            </td>

                            <td className='px-11 py-4 whitespace-nowrap text-sm font-medium '>
                                <button
                                  onClick={() => deleteThis(product._id)}
                                  className='text-red-400 hover:text-red-300'
                                >
                                  <Trash className='h-5 w-5' />
                                </button>
                            </td>
                        </tr>
                    ))}
                  </tbody>

          }
      </table>
    </div>
  )
}

export default ProductsList
