import React from 'react'
import { Trash , Minus , Plus } from 'lucide-react'
import { useDeleteFromCart, useUpdateQuantity } from '../hooks/CartHookes'


const CartItem = ({item}) => {
  const deleteProduct=useDeleteFromCart()
  const updateQuantity=useUpdateQuantity()
  return (
    <div className='rounded-lg  border shadow-sm border-gray-700 bg-gray-800 p-6 '>
      <div className='flex justify-between items-center'>
          
          <div className='flex'>  
            <img className=' h-24 w-24 rounded object-cover' src={item.image}/>
            <div className='flex flex-col justify-center gap-3 ml-4'>
                <div className=' font-bold text-lg'>
                  {item.name}
                </div>
                <div className='text-slate-400'>
                  {item.description}
                </div>
                <button className='text-red-500'
                  onClick={()=>deleteProduct(item._id)}
                  >
                  <Trash size={18}/>
                </button>
            </div>
          </div>

          <div className='flex space-x-6'>
            <div className='flex space-x-3 items-center'>
                <div onClick={()=>updateQuantity(item._id,item.quantity-1)} 
                  className='bg-gray-500 rounded-full text-slate-300 cursor-pointer'>
                  <Minus size={19}/>
                </div>
                <div>
                  {item.quantity}
                </div>
                <div onClick={()=>updateQuantity(item._id,item.quantity+1)} 
                  className='bg-gray-500 rounded-full text-slate-300 cursor-pointer'>
                  <Plus size={19}/>
                </div>
            </div>
            
            <div className=''>
                  {item.price}
            </div>
          </div>
			</div>
    </div>  
  )
}

export default CartItem
