import { PlusCircle, ShoppingBasket ,BriefcaseBusiness} from 'lucide-react'
import React, { useState } from 'react'
import CreateProductsForm from '../components/CreateProductsForm'
import ProductsList from '../components/ProductsList'
import AdminOrderList from '../components/AdminOrderLIst'

const Tabs=[
    { id:'create',name:"Create-Product" , icon: PlusCircle},
    { id:'products' , name:'Products' , icon:ShoppingBasket},
    { id:'orders' , name:'Orders' , icon:BriefcaseBusiness},
]
const AdminPage = () => {
    const [activeTab,setActiveTab]=useState('create')
    
  return (
    <div className='flex justify-center min-h-screen overflow-hidden'>
        <div className='flex flex-col py-16 items-center '>
            <div className='text-4xl font-bold mb-8 text-blue-400'>                
                Admin Dashboard
            </div>
                
            <div className='flex gap-4 items-center'>
                {Tabs.map((tab,key)=>(<div key={key} onClick={()=>setActiveTab(tab.id)}
                                         className={`flex gap-1 ${activeTab==tab.id ? `bg-blue-700` : 'bg-gray-500'} rounded-lg p-2
                                                     cursor-pointer duration-300`}>
                    {<tab.icon size={18} className='mt-1'/>}
                    {tab.name}
                </div>))}
             </div>
            
            <div>
                {activeTab=='create' && <CreateProductsForm/>}
                {activeTab=='products' && <ProductsList/>}
                {activeTab=='orders' && <AdminOrderList/>}
            </div>
        </div>
    </div>
  ) 
}

export default AdminPage
