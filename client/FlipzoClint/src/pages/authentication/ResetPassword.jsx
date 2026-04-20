import React from 'react'
import LogoAnimation from '../../components/auth/LogoAnimation'
import { Button, InputAdornment, TextField, Typography } from '@mui/material'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {

  const[newPassword,setNewPassword]=useState(true);
  const[confirmNewPassword,setConfirmNewPassword]=useState(true);
  const [formData, setFormData] = useState({
    password:"",
    confirmPassword:"",
  })
 const location = useLocation();
const [loading,setLoading]= useState(false);
const navigate = useNavigate();


  useGSAP(()=>{
    const t1 = gsap.timeline();
    t1.from(".resetFormAnimation",{
     x:-100,
    opacity:0,
    delay:0.3,
    duration:0.6,
    })
    t1.from(".animateForm",{
     y:100,
    opacity:0,
    duration:0.3,
    stagger:0.2,
   },"-=0.6");
})

const onChangeHandler =(event)=>{
  const{name,value}=event.target;
  setFormData(prev=>{
    return {
      ...prev,
      [name]: value,
    }
  })
}


const submitHandler= async(e)=>{
    e.preventDefault();
    formData.email =location.state?.email;
    // const email = location.state?.email;
    
   if(formData.password.length <8){
      toast.error("Password must includes minimum 8 letters");
      return;
    }
    if(formData.password !== formData.confirmPassword){
      toast.error("Password and confirm password not matched")
      return;
    }

    const toastId =toast.loading("Changing password...")
    try {
      setLoading(true);
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/resetPassword`,formData)
        
      if (!response?.data?.success) {
            throw new Error("Error occur during reset password");
        }

        toast.dismiss(toastId);
        toast.success(response?.data?.message);
        setLoading(false);
        navigate("/logIn");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.dismiss(toastId);
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }




  return (
    <div className='flex px-24 py-6 w-screen h-screen'>
      <div className='w-[50%]'>
        <div>
          <Typography variant='h3' sx={{ fontWeight: 600 }}>
            Change Your Password
          </Typography>

          <p className='text-[14px] mt-2'>
            Enter a new password below to change your password
          </p>
        </div>
        {/* reset password form */}
        <div className='bg-white rounded-xl w-[80%] mt-24 p-6 resetFormAnimation overflow-y-hidden'>
          <form className='flex flex-col gap-6 ' onSubmit={submitHandler}>

            
            <TextField             
              variant="filled"
              type={newPassword ? "text": "password"}
              placeholder="Enter your new password"
              label="New password"
              fullWidth
              required
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
              className='animateForm'
          InputProps={{
            endAdornment: (
                 <InputAdornment position="end">
                  {
                  newPassword ?  <IoEyeSharp  size={25} className='cursor-pointer'
                   onClick={()=>{setNewPassword(false)}}/>
                   :<FaEyeSlash size={25} className='cursor-pointer' 
                   onClick={()=>{setNewPassword(true)}}/>
                  }
                 </InputAdornment>
                 ),
               }}
               name="password"
               value={formData.password}
               onChange={onChangeHandler}
            />

            <TextField             
              variant="filled"
              type={confirmNewPassword ? "text": "password"}
              placeholder="Confirm  your new password"
              label="Re-enter new password"
              fullWidth
              required
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
               className='animateForm'
            InputProps={{
            endAdornment: (
                 <InputAdornment position="end">
                  {
                  confirmNewPassword?  <IoEyeSharp  size={25} className='cursor-pointer'
                   onClick={()=>{setConfirmNewPassword(false)}}/>
                   :<FaEyeSlash size={25} className='cursor-pointer' 
                   onClick={()=>{setConfirmNewPassword(true)}}/>
                  }
                 </InputAdornment>
                 ),
               }}
               name="confirmPassword"
               value={formData.confirmPassword}
               onChange={onChangeHandler}
            />

            <div className='flex items-center w-full'>
              <Button variant='contained'
              size="large"
              type="submit"
              fullWidth
              className='animateForm'
              sx={{
                textTransform:"none",
                backgroundColor: "#ff9800",
                 "&:hover": { backgroundColor: "#f57c00" }
               }}
               disabled={loading}
             >Reset Password</Button>
             { 
             loading && <i className="fa-solid fa-spinner text-b animate-spin -ml-8"></i>
             }
            </div>

          </form>
        </div>
      </div>
  
      {/* (Logo Animation) */}
      <div className='w-[50%] flex items-center justify-center h-full'>
        <LogoAnimation />
      </div>

    </div>
  )
}

export default ResetPassword