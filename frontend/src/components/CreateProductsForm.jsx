import React, { useState } from 'react'
import { Upload, Loader } from 'lucide-react'
import { url } from '../url/url'
import axios from "axios"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { setProduct } from '../store/productsSlice'

const categories=["jeans","t-shirts","shoes","glasses","jackets","suits","bags"]

const CreateProductsForm = () => {
    const dispatch=useDispatch()
    const [newProduct,setNewProduct]=useState({
        name: "",
		description: "",
		price: "",
		category: "",
		image: "",
    })
    const [loading,setLoading]=useState(false);


    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(newProduct.name=="" || newProduct.description=="" || newProduct.price=="" || newProduct.category=="" || newProduct.image==""  ){
            toast.error("Enter All Details")
            return;
        }
        // console.log(newProduct)
        try {
            setLoading(true)
            const response=await axios.post(`${url}/products`,{
                newProduct
            },{
                headers:{   
                    authorization:localStorage.getItem("token")
                }
            })
            console.log(response)
            if(response.status==200){
                dispatch(setProduct(response.data.product))
                toast.success("Product Added")
                setNewProduct({ name:"",
                                description: "",
                                price: "",
                                category: "",
                                image: "" })
            }else{
                toast.error("Something went wrong...")
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong...")
        }finally{
            setLoading(false)
        }
    }

    const handelImageChange=(e)=>{
        const file=e.target.files[0]
        if(file){
            const reader=new FileReader();
            reader.onloadend=()=>{
                setNewProduct({...newProduct,image:reader.result})
            }
            reader.readAsDataURL(file)
        }
    }
return (
    <div className='bg-gray-800 p-6 rounded-lg mx-auto mt-8 w-96'>
      <div className="text-2xl font-semibold mb-6 text-blue-300 text-center">
        Create Product
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-300'>
						Product Name :
					</label>
                    <input
						type='text'
						id='name'
						name='name'
						value={newProduct.name}
						onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-blue-500 focus:border-blue-500'
						required
					/>
        </div>
        <div>
                    <label htmlFor='description' className='block text-sm font-medium text-gray-300'>
						Description :
					</label>
                    <textarea
						type='textarea'
						id='descriptiom'
						name='description'
						value={newProduct.description}
						onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-blue-500 focus:border-blue-500'
						required
					/>
        </div>
        
        <div>
                    <label htmlFor='price' className='block text-sm font-medium text-gray-300'>
						Price :
					</label>
                    <input
						type='number'
						id='price'
						name='price'
						value={newProduct.price}
						onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-blue-500 focus:border-blue-500'
						required
					/>
        </div>
        <div>
                    <label htmlFor='category' className='block text-sm font-medium text-gray-300'>
						Category :
					</label>
                    <select
						type='number'
						id='category'
						name='category'
						value={newProduct.category}
						onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-blue-500 focus:border-blue-500'
						required
					>
                        <option value=''>Select a Category</option>
                        {categories.map((category,key)=>(
                            <option key={key} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
        </div>
        <div className='mt-1 flex items-center'>
            <input type="file" id='image' className='hidden' accept='image/*' onChange={handelImageChange}/>
            <label 
             htmlFor="image"
             className='block bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						px-3 text-white focus:outline-none focus:ring-2
						focus:ring-blue-500 focus:border-blue-500 cursor-pointer'
             >
                <Upload className='h-5 w-5 inline-block mr-2'/>
                Upload Image
            </label>
            {newProduct.image && <div className='ml-10 text-sm text-slate-300 bg-green-600 font-semibold p-2 rounded-lg '> Image Uploaded</div>}
        </div>
        
        <button
            type='submit'
            className='w-full flex justify-center bg-blue-600 border border-gray-600 rounded-md shadow-sm py-2
						px-3 text-white focus:outline-none focus:ring-2
						focus:ring-blue-500 focus:border-blue-500 cursor-pointer'
            disabled={loading}
        >
            {loading ? 
                        <>
                            <Loader className='animate-spin'/>
                        </>
                :
                        <>
                            <div className='font-semibold'>
                                Create Product
                            </div>
                        </>
            }
        </button>

      </form>
    </div>
  )
}

export default CreateProductsForm
