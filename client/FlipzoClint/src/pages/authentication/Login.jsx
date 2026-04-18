import { Button, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogoAnimation from '../../components/auth/LogoAnimation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// password  and show password ke liye
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import axios from 'axios';



function Login() {

  const navigate = useNavigate();
  const[showPassword,setShowPassword]=useState(false);
   const [loading,setLoading]= useState(false);
   const [formData, setFormData] = useState({
    email: "",
    password: "",
   })

  useGSAP(()=>{
    const t1 = gsap.timeline();
    t1.from(".loginAnimation",{
    x:-100,
    opacity:0,
    delay:0.3,
    duration:0.6,
    });
    t1.from(".inputAnimation",{
      y:100,
      opacity:0,
      duration:0.3,
      stagger:0.2,
    },"-=0.9")
  });

const onChangeHandler=(event)=>{
  const {name,value}= event.target;

 setFormData(prev => ({
  ...prev,
  [name]: value
}));

}
  const submitHandler= async(e)=>{
    e.preventDefault();
    const toastId = toast.loading("Login...");

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logIn`,formData);
      if(!response?.data?.success){
        throw new Error("Error occure during login")
      }

      toast.dismiss(toastId);
      toast.success(response?.data?.message)
      setLoading(false);

    } catch (error) {
       console.log(error);
       setLoading(false);
       toast.dismiss(toastId);
       toast.error(error.response?.data?.message  || "Something went wrong...")
    }
  }

  return (
   <div className='flex '>
       <div className='w-[50%]  px-24 py-6 overflow-y-hidden'>
        <Typography variant='h3' sx={{fontWeight:600}}>
             Welcome!
       </Typography>
       <p className='text-[16px] mt-2  items-center'>
         Welcome back to Flip<span className='text-orange-400 font-semibold text-[16px]'>Zo</span>! Sign in to your Flip<span className='text-orange-400 font-semibold text-[16px]'>Zo</span> account to continue.
        </p>
        
        {/* login  form */}
        <div className='bg-white rounded-xl w-[80%] mt-16 p-6 overflow-y-hidden  loginAnimation'>
          <form  className='flex flex-col gap-6 ' onSubmit={submitHandler}>
             <TextField 
             variant='filled'
             type='email'
               placeholder='Your email address' 
               label="email"
               fullWidth
               required
               className='inputAnimation'
               onChange={onChangeHandler}
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
                 name='email' />

             <div className='flex flex-col'>
              <TextField variant='filled'
              type={showPassword ?"text" :"password"}
               placeholder='Your password' 
               label="password"
               fullWidth
               required
               className='inputAnimation'
               onChange={onChangeHandler}
               InputProps={{
                 endAdornment: (
                     <InputAdornment position="end">
                         {
                          showPassword ?  <IoEyeSharp  size={25} className='cursor-pointer'
                          onClick={()=>{setShowPassword(false)}}/>
                         :<FaEyeSlash size={25} className='cursor-pointer' 
                         onClick={()=>{setShowPassword(true)}}/>
                       }
                     </InputAdornment>
                     ),
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
                 name='password'
                 />
                  <Link to={"/fotgot-password"} className='text-orange-500 self-end text-[14px] inputAnimation'>
                  Forgot password?</Link>
              </div>
          <div>
            <Button variant='contained'
            size="large"
            type="submit"
            fullWidth
            sx={{
              textTransform:"none",
                backgroundColor: "#ff9800",
                 "&:hover": { backgroundColor: "#f57c00" }
               }}
               className='inputAnimation'
               disabled={loading}
             >LogIn</Button>
             { 
             loading && <i className="fa-solid fa-spinner text-b animate-spin -ml-8"></i>
             }
          </div>
          </form>


          <p className='text-black  mt-6 flex justify-center gap-2 text-[16px]  inputAnimation'>
            Don't have an account? 
            <span  className="text-orange-500 cursor-pointer inputAnimation" onClick={()=>{navigate("/")}} >Sign Up</span>
            </p>
        </div>
       </div>


       {/* Logo animation */}
       <div className='w-[50%] h-[100vh] flex items-center justify-center -ml-14'>
           <LogoAnimation/>
       </div>
   </div>
  )
}

export default Login