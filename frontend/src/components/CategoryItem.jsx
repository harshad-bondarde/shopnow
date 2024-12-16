import React from 'react'
import { Link } from 'react-router-dom'

const CategoryItem = ({category}) => {
  return (
    <div className='relative overflow-hidden h-80 w-full rounded-lg group'>
        <Link to={"/category"+ category.href}>
            <div className='w-full h-full cursor-pointer'>
                <img src={category.imageUrl} alt={category.name} 
                 className='w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105'/>
            </div>

            <div className='absolute bottom-0 left-0 p-4'>
                <div className='text-white text-2xl font-bold mb-2'>
                    {category.name}
                </div>
                <div className='text-white text-sm'>
                    Explore {category.name}
                </div>
            </div>
        </Link>
    </div>
  )
}

export default CategoryItem
