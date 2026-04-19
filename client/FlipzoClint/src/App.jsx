import React from 'react'
import "./App.css"
import SignUp from './pages/authentication/SignUp'
import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Otp from './pages/authentication/Otp'
import Login from './pages/authentication/Login'
import ForgotPassword from './pages/authentication/ForgotPassword'
import ResetPasswordOtpVarify from './pages/authentication/ResetPasswordOtpVarify'
import ResetPassword from './pages/authentication/ResetPassword'


function App() {

  const router = createBrowserRouter([
    {
      path:"/",element:<><SignUp/></>
    },
    {
      path:"/otp",element:<><Otp/></>
    },
    {
      path:"/login",element:<><Login/></>
    },
    {
      path:"/fotgot-password",element:<><ForgotPassword/></>
    },
     {
      path:"/resetPasswordOtpVarify",element:<><ResetPasswordOtpVarify/></>
    },
    {
      path:"/reset-password",element:<><ResetPassword/></>
    }
  ])
  return (
    <div className='bg-[#0B0B0F] text-white h-screen w-screen 
    overflow-x-hidden overflow-y-auto'>
      
      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  )
}
// 
export default App