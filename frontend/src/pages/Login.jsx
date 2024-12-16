import React, { useState } from 'react'
import {motion} from "framer-motion"
import { Mail, User , Lock, Loader , ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'
import { url } from '../url/url'

const Login = () => {
  const dispatch=useDispatch()
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  const [loading,setLoading]=useState(false)

  const handleSubmit=async (e)=>{
    e.preventDefault()
    const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(formData.email)){
      toast.error("Enter valid email")
      return ;
    }
    try {
      setLoading(true)
      const response=await axios.post(`${url}/auth/login`,formData)
      console.log(response.data)
      dispatch(setAuthUser(response.data.user))
      toast.success(response.data.message)
      localStorage.setItem("token",response.data.token)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }finally{
      setLoading(false)
    }
    

    
    
  }
  return (
    <div className='flex flex-col items-center my-10'>
      <motion.div 
        className='text-3xl text-blue-400 font-bold'
        initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
      >
        Login
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.1 }}
      >
          <div className='my-8 py-8 px-4 bg-gray-600 rounded-xl w-96 '>
              <form onSubmit={handleSubmit} className='space-y-5'>  
      
                
                <div>
                  <label htmlFor='email' className='font-medium text-gray-300'> 
                      Email
                  </label>
                  <div className='items-center mt-3 rounded-md shadow-sm flex justify-between gap-5'>
                      
                      <div className='text-gray-300'>
                        <Mail/>
                      </div>

                      <input
                        id='email'
                        type='text'
                        value={formData.email}
                        placeholder='johndoe@gmail.com'
                        onChange={(e)=>setFormData({...formData,email:e.target.value})}
                        className='w-full bg-gray-700 shadow-sm text-white border-gray-300 rounded-lg focus:outline-none p-2'
                      />

                  </div>
                </div>
                
                <div>
                  <label htmlFor='passowrd' className='font-medium text-gray-300'> 
                      Passowrd
                  </label>
                  <div className='items-center mt-3 rounded-md shadow-sm flex justify-between gap-5'>
                      
                      <div className='text-gray-300'>
                        <Lock/>
                      </div>

                      <input
                        id='passowrd'
                        type='text'
                        value={formData.password}
                        placeholder='********'
                        onChange={(e)=>setFormData({...formData,password:e.target.value})}
                        className='w-full bg-gray-700 shadow-sm text-white border-gray-300 rounded-lg focus:outline-none p-2'
                      />

                  </div>
                </div>

                <button type='submit' disabled={loading} className='w-full bg-blue-600 border-blue-500 rounded-xl text-center p-2 font-medium shadow-md cursor-pointer'>
                  {loading ? (
                        <div className='ml-40'>
                          <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                          
                        </div>
                      ) : (
                        <>
                          Login
                        </>
                    )}
                </button>
              </form>
          </div>

          <div className='flex justify-center'>
              Don't have an account ?  
            <Link to={"/signup"} className='flex text-blue-500 cursor-pointer hover:underline'>
              <div className='ml-1'>Signup here</div> 
              <ArrowRight size={18} className='mt-1 ml-1'/>
            </Link>
          </div>
      </motion.div>
    </div>
  )
}

export default Login

