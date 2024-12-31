import React from 'react'
import {ShoppingCart , LogIn , LogOut , Lock } from "lucide-react"
import { Link } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { setAuthUser } from '../store/userSlice'
import { setCart } from '../store/cartSlice'
import { setAllproducts } from '../store/productsSlice'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const authUser=useSelector(state=>state.user.authUser);
  const {cartItems}=useSelector(state=>state.cart)

  const isadmin=authUser?.role=='admin';
  return (
    <header className='w-screen bg-gray-800 h-fit shadow-sm shadow-blue-300'>
      <div className='mx-10 items-center py-2'>
        <div className='flex justify-between items-center'>
          
          <Link to={'/'} className='text-3xl font-bold text-slate-300 ' >
            Shopify
          </Link>

          <nav className='flex items-center gap-4'>
              
              <Link to={''} className='text-gray-300 hover:text-blue-400 transition duration-300'>
                Home
              </Link>
              {
                authUser && isadmin && 
                              <Link to={"/dashboard"} className='bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 
						                              rounded-md flex items-center transition duration-300 ease-in-out mr-1'>
                                    Dashboard
                              </Link>
              }
              {
                authUser && (
                  <Link to={'/cart'} className='relative text-gray-300 hover:text-blue-400 transition duration-300' >
                    <ShoppingCart size={19}/>
                      <div className='absolute -top-3 -left-3 bg-blue-700 rounded-full h-6 w-6 text-center bg-opacity-85 '>
                          {cartItems.length}
                      </div>
                  </Link>
                )
              }

              {
                authUser ? 
                      <div className='cursor-pointer' onClick={()=>{
                                                         dispatch(setAuthUser(null))
                                                         dispatch(setCart([]))
                                                         dispatch(setAllproducts([]))
                                                         localStorage.removeItem('token')
                                                         navigate('/login')
                                                      }}> 
                        <div className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
						                              rounded-md flex items-center transition duration-300 ease-in-out'>
                          <LogOut size={18} className='mr-1'/>
                            Logout
                        </div>
                      </div>
                      :
                      <>
                        <Link to={"/signup"} className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 
						                              rounded-md flex items-center transition duration-300 ease-in-out' >
                            Sign Up
                        </Link> 
                        <Link to={"/login"} className='flex gap-1 items-center bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
						                              rounded-md transition duration-300 ease-in-out'>
                            <LogIn size={18}/>
                              Login
                        </Link>
                      </>
              }


          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
