import React, { useState } from 'react'
import {motion} from "framer-motion"
import { Mail, User , Lock, Loader , ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from "axios"
import {url} from "../url/url"
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const SignUp = () => {
  const navigate=useNavigate()
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  })
  const [loading,setLoading]=useState(false)

  const handleSubmit=async (e)=>{
    e.preventDefault()
    const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(formData.email)){
      toast.error("Enter valid email")
      return ;
    }
    if(formData.password!=formData.confirmPassword){
      toast.error("Passwords do not match")
      return;
    }
    try {
      setLoading(true)
      const response=await axios.post(`${url}/auth/signup`,formData)
      console.log(response.data)
      toast.success(response.data.message)
      localStorage.setItem("token",response.data.token)
      navigate("/login")
    } catch (error) {
      console.log(error.response)
      toast.error(error.response.data.message)
    }finally{
      setLoading(false)
    }
    

    
    
  }

  return (
    <div className='flex flex-col items-center my-10 '>
      <motion.div 
        className='text-3xl text-blue-400 font-bold'
        initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
      >
        Create an account
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.1 }}
      >
          <div className='my-8 py-8 pl-6 pr-10 bg-gray-600 rounded-xl w-96'>
              <form onSubmit={handleSubmit} className='space-y-5'>  
                
                <div>
                  <label htmlFor='name' className='font-medium text-gray-300'> 
                      Full Name
                  </label>
                  <div className='items-center mt-3 rounded-md shadow-sm flex justify-between gap-5'>
                      
                      <div className='text-gray-300'>
                        <User/>
                      </div>

                      <input
                        id='name'
                        type='text'
                        value={formData.name}
                        placeholder='john doe'
                        onChange={(e)=>setFormData({...formData,name:e.target.value})}
                        className='w-full bg-gray-700 shadow-sm text-white border-gray-300 rounded-lg focus:outline-none p-2'
                      />

                  </div>
                </div>
                
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
                        type='password'
                        value={formData.password}
                        placeholder='********'
                        onChange={(e)=>setFormData({...formData,password:e.target.value})}
                        className='w-full bg-gray-700 shadow-sm text-white border-gray-300 rounded-lg focus:outline-none p-2'
                      />

                  </div>
                </div>

                <div className=''>
                  <label htmlFor='confirmPassowrd' className='font-medium text-gray-300'> 
                     Confirm Passowrd
                  </label>
                  <div className='items-center mt-3 rounded-md shadow-sm flex justify-between gap-5'>
                      
                      <div className='text-gray-300'>
                        <Lock/>
                      </div>

                      <input
                        id='confirmPassowrd'
                        type='password'
                        value={formData.confirmPassword}
                        placeholder='********'
                        onChange={(e)=>setFormData({...formData,confirmPassword:e.target.value})}
                        className='w-full bg-gray-700 shadow-sm text-white border-gray-300 rounded-lg focus:outline-none p-2'
                      />

                  </div>
                </div>

                <button type='submit' disabled={loading} className='w-full bg-blue-600 border-blue-500 rounded-xl text-center p-2 font-medium shadow-md cursor-pointer'>
                  {loading ? (
                        <div className='ml-36'>
                          <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                          
                        </div>
                      ) : (
                        <div>
                          Sign up
                        </div>
                    )}
                </button>
              </form>
          </div>

          <div className='flex justify-center'>
              Already have an account ?  
            <Link to={"/login"} className='flex text-blue-500 cursor-pointer hover:underline'>
              <div className='ml-1'>Login here</div> 
              <ArrowRight size={18} className='mt-1 ml-1'/>
            </Link>
          </div>
      </motion.div>
    </div>
  )
}

export default SignUp
