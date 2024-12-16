import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
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
                </Routes> 
            </BrowserRouter>
      </div>
    </>
)
}

export default App
