import {url} from "../url/url"
import axios from "axios"
import {useDispatch , useSelector} from "react-redux"
import toast from "react-hot-toast"
import { setAllproducts ,setProductLoader } from "../store/productsSlice"
import { useEffect } from "react"


export const useGetAllProducts = () => {
  const dispatch=useDispatch()
  const { productLoader }=useSelector(state=>state.product)
  const { products }=useSelector(state=>state.product)
  
  useEffect(()=>{
    const fetchProducts = async()=>{
      try {
        dispatch(setProductLoader(true))
        const response=await axios.get(`${url}/products/`,{
          headers:{   
            authorization:localStorage.getItem("token")
          }
        })
        if(response.status==200){
          dispatch(setAllproducts(response.data.products))
        }else{
          console.log(response)
          toast.error("Error while getting your products")
        }
      } catch (error) {
        console.log(error)
        toast.error("Error while getting your products")
      }finally{
        dispatch(setProductLoader(false))
      }
    }
    fetchProducts()
  },[dispatch])

  return { productLoader , products }
}

export const useToggleProductFeature=()=>{
  const dispatch=useDispatch()
  const {products}=useSelector(state=>state.product)
  const toggle=async(product_id)=>{
    try {
      dispatch(setProductLoader(true))
      const response=await axios.patch(`${url}/products/${product_id}`)
      if(response.status==200){
        const newProducts=products.map(product=>(
                            (product._id==product_id) ? {...product, isFeatured:response.data.isFeatured} : product
                          ))
        dispatch(setAllproducts(newProducts))
      }
    } catch (error) {
      toast.error("Error while Toggling the product")
      console.log(error)
    }finally{
      dispatch(setProductLoader(false))
    }
  }
  return toggle

}

export const useDeleteProduct=()=>{
  const dispatch=useDispatch()
  const products=useSelector(state=>state.product.products)
  const deleteProduct=async(product_id)=>{
    try {
      dispatch(setProductLoader(true))
      const response=await axios.post(`${url}/products/${product_id}`,{},{
        headers:{   
          authorization:localStorage.getItem("token")
        }
      })
      // console.log(response)
      if(response.status==200){  
        const newProducts=products.filter(product=>product._id!=product_id)
        dispatch(setAllproducts(newProducts))
        toast.success("Product Deleted")
      }else{
        toast.error("Error while deleting the product")
      }
    } catch (error) {
      toast.error("Error while deleting the product")
      console.log(error)
    }finally{
      dispatch(setProductLoader(false))
    }
  }
  return deleteProduct
}

export const useGetProductsByCategory=()=>{
  const dispatch=useDispatch()
  const fetchProducts=async(category , setCategoryProducts)=>{
    try {
      dispatch(setProductLoader(true))
      const response=await axios.get(`${url}/products/category/${category}`);
      // console.log(response)
      setCategoryProducts(response.data.products)
    } catch (error) {
      console.log(error)
      toast.error("Error while getting category Products...")
    }finally{
      dispatch(setProductLoader(false))
    }
  }
  return fetchProducts;
}

export const useGetFeaturedProducts=()=>{
  const dispatch=useDispatch()
  const getFeaturedProducts=async()=>{
    try {
      const response=await axios.get(`${url}/products/featured`)
      console.log(response)
      if(response.status==200){
      
        return response.data.featuredProducts
      }
    } catch (error) {
      // console.log(error)
      toast.error("Error while getting featured products ")
      return []
    } 
 
  }
  return getFeaturedProducts
}