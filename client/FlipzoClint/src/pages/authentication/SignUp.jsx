import React, { useState } from 'react'
import LogoAnimation from '../../components/auth/LogoAnimation'
import { Button, InputAdornment, TextField, Typography } from '@mui/material'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useGSAP } from '@gsap/react';
import gsap from "gsap"
import { useNavigate } from 'react-router-dom';
// passwoed ke pass walaa icons
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    
  });
  const[showPassword,setShowPassword]=useState(false);
  const[confirmShowPassword,setConfirmShowPassword]=useState(false);

 const [loading,setLoading]= useState(false);

const navigate = useNavigate();



 const changeHandler =(event)=>{
  
  setFormData(prev =>{
    return{
         ...prev,
         [event.target.name]:event.target.value,
    }
  });
 }
   const submitHandler= async(e)=>{
    e.preventDefault();

    if(formData.password !== formData.confirmPassword){
      toast.error("password and Confirm Password are not matched");
      return;
    }

    if(formData.password.length <8){
      toast.error("Password must includes minimum 8 letters");
      return;
    }
    
     const data = {
      email:formData.email,
      
     }

    const toastId = toast.loading("Sending otp...")
    try{
       setLoading(true);
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create-otp`,data);

        if(!response.data.success){
          throw new Error("Error occur during SignUp")
        }
      
      toast.dismiss(toastId);
      // go to the otp page and also take data from the sigup page
      navigate("/otp",{ state:{Data:formData}})
      //  pop out msg when otp send
       toast.success("Otp send succesfully");
       setLoading(false)

    }catch(error){
       toast.dismiss(toastId);
       toast.error(error.response?.data?.message || " Something went wrong")
       console.log(error);
       setLoading(false);


    }
   }
  useGSAP(()=>{
  const t1 = gsap.timeline();

  t1.from(".fA1",{
    x:-100,
    opacity:0,
    delay:0.3,
    duration:0.6,
  })

  t1.from(".ipf",{
    y:100,
    opacity:0,
    duration:0.3,
    stagger:0.2,
  },"-=0.9");

  })


  return (
 <div className='flex px-24 py-6 overflow-y-hidden '>



     {/* SignUp form */}
        <div className='w-[50%] mt-8'>
           <Typography variant='h3' sx={{fontWeight:600}}>
             SignUp
           </Typography>
           <p className='text-[14px] mt-2'>Fill the form below to create your account</p>


           {/* create form */}
           
           
 <div className='bg-white rounded-xl w-[80%] mt-6 p-6 overflow-y-hidden  fA1'>
     <form className='flex flex-col gap-6' onSubmit={submitHandler}>

  <TextField
    type="text"
    variant="filled"
    placeholder="Enter your First Name"
    label="First Name"
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
    onChange={changeHandler}
    name="firstName"
    className='ipf'
  />

  <TextField
    type="text"
    variant="filled"
    placeholder="Enter your Last Name"
    label="Last Name"
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
    onChange={changeHandler}
    name="lastName"
    className='ipf'
  />

  <TextField
    type="email"
    variant="filled"
    placeholder="Enter your email"
    label="Email"
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
    onChange={changeHandler}
    name ='email'
    className='ipf'
  />
<TextField
    type={showPassword ?"text" :"password"}
    variant="filled"
    placeholder="Enter your password"
    label="Password"
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
    onChange={changeHandler}
    name='password'
    className='ipf'
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
  />
  <TextField
    type={confirmShowPassword ?"text" :"password"}
    variant="filled"
    placeholder="confirm your password"
    label=" confirm Password"
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
    onChange={changeHandler}
    name='confirmPassword'
    className='ipf'
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
           {
            confirmShowPassword ?  <IoEyeSharp  size={25} className='cursor-pointer'
            onClick={()=>{setConfirmShowPassword(false)}}/>
            :<FaEyeSlash size={25} className='cursor-pointer' 
            onClick={()=>{setConfirmShowPassword(true)}}/>
          }
          </InputAdornment>
        ),
      }}
  />

      <div className='flex items-center'> 
            <Button variant='contained'
            size="large"
            type="submit"
             fullWidth
            sx={{
              textTransform:"none",
                backgroundColor: "#ff9800",
                 "&:hover": { backgroundColor: "#f57c00" }
               }}
               className='ipf'
               disabled={loading}
             >Sign Up</Button>
             { 
             loading && <i className="fa-solid fa-spinner text-b animate-spin -ml-8"></i>
             }
      </div>
            

           </form>
           <p className='text-black  mt-6 flex justify-center gap-2 text-[16px] ipf'>
            Already have an account? 
            <span  className="text-orange-500 cursor-pointer" onClick={()=>{navigate("/login")}}>Sign In</span>
            </p>
        </div>
        
        </div>



     {/*Flipzo logo  */}
       <div className='w-[50%] flex justify-center items-center'>
        <LogoAnimation/>
       </div>
  </div>
  )
}

export default SignUp