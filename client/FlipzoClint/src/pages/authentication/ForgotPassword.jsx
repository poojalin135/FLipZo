import React, { useState } from 'react'
import LogoAnimation from '../../components/auth/LogoAnimation'
import { Button, InputAdornment, TextField, Typography } from '@mui/material'

import { MdOutlineEmail } from "react-icons/md";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import toast from 'react-hot-toast';
import axios from 'axios';

function ForgotPassword() {
    const[email, setEmail] = useState("")
     const [loading,setLoading]= useState(false);

useGSAP(()=>{
    const t1 = gsap.timeline();
    t1.from(".formAnimation",{
     x:-100,
    opacity:0,
    delay:0.3,
    duration:0.6,
    })
    t1.from(".formItem",{
     y:100,
    opacity:0,
    duration:0.3,
    stagger:0.2,
   },"-=0.3");
})

const  submitHandler = async (e) => {
    e.preventDefault();
    console.log(email);
    const toastId = toast.loading("Checking your email...")
    try {
        setLoading(true);
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/sendOtpForgotPassword`,{email});
        if(!response.data.success){
          throw new Error("Error occur during  sending otp for reset password")
        }
      toast.dismiss(toastId);
      toast.success(response?.data?.message);
      setLoading(false);
    } catch (error) {
       toast.dismiss(toastId);
       toast.error(error.response?.data?.message || " Something went wrong")
       console.log(error);
       setLoading(false);
    }
}

  return (
    <div className='flex flex-row px-24 py-6 h-screen '>
        {/* forgot password form*/}
        <div className='w-[50%]  '>
            <Typography variant='h3' sx={{fontWeight:600}}>
             Forgot Password
           </Typography>
           <p className='text-[14px] mt-2'>Please enter your registered email address. 
            We will send a One-Time Password (OTP) to verify
             your identity and allow you to reset your password.</p>

             {/*form  */}
             <div className='bg-white rounded-xl w-[80%] mt-32 p-6 formAnimation '>
                 <form className='flex flex-col gap-6 overflow-y-hidden' onSubmit={submitHandler}>
                 <TextField
                 className='formItem'
                     type="email"
                     variant="filled"
                     placeholder="Enter your email"
                     label="email"
                     fullWidth
                     required
                     onChange={(e)=>{
                        setEmail(e.target.value);
                     }}
                     sx={{
                       "& .MuiFilledInput-underline:before": {
                         borderBottomColor: "#ff9800",
                       },
                       "& .MuiFilledInput-underline:after": {
                         borderBottomColor: "#ff9800",
                       },
                       "& .MuiInputLabel-root.Mui-focused": {
                         color: "#ff9800",
                       }
                     }}
                     name="email"
                     InputProps={{
                       startAdornment: (
                        <InputAdornment position="start">
                            <MdOutlineEmail  size="25" />
                       </InputAdornment>
                       ),
                     }}
                   />
                  <div className='flex items-center'> 
                     <Button variant='contained'
                   className='formItem'
                   size="large"
                    type="submit"
                     fullWidth
                     disabled={loading}
                       sx={{
                       textTransform:"none",
                        backgroundColor: "#ff9800",
                         "&:hover": { backgroundColor: "#f57c00" }
                          }}
                          >Submit</Button>
                          { 
                        loading && <i className="fa-solid fa-spinner text-b animate-spin -ml-8"></i>
                         }
                  </div>

                   </form>
               </div>
             </div>
             
        {/* animation logo */}
            <div className='w-[50%] flex justify-center items-center'>
              <LogoAnimation/>
           </div>
    </div>

  )
}

export default ForgotPassword