import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import AdminPage from "./pages/AdminPage"
import CategoryPage from "./pages/CategoryPage"
import CartPage from "./pages/CartPage"
function App() {
  const authUser=useSelector(state=>state.user.authUser)
  return (
    <>
      
      <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
            <BrowserRouter>
              <Navbar/>
                <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="/signup" element={!authUser ? <SignUp/>: <Navigate to={'/'}/>}/>
                  <Route path="/login" element={!authUser ? <Login/>: <Navigate to={'/'}/>}/>
                  <Route path='/dashboard' element={authUser && authUser.role=='admin' ? <AdminPage/> : <Navigate to={"/"}/>}/>
                  <Route path='/category/:category' element={<CategoryPage/>}/>
                  <Route path='/cart' element={<CartPage/>}/>
                </Routes> 
            </BrowserRouter>
      </div>
    </>
)
}

export default App
