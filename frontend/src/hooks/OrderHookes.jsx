import {url} from "../url/url"
import axios from "axios"
import toast from "react-hot-toast"

export const useGetAllOrders=async()=>{
        let orders=[]
        try {
            const response=await axios.get(`${url}/orders/getAllOrders`,{
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            // console.log(response)
            if(response.status==200){
                orders=response.data.orders
            }else{
                console.log(response)
                toast.error("internal server error")
            }
        } catch (error) {
            console.log(error)
            toast.error("Error while getting Orders")
        }
        return orders
    
}