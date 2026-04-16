import { Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import OTPInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoAnimation from '../../components/auth/LogoAnimation';
import { useGSAP } from '@gsap/react';
import gsap from "gsap";

function Otp() {

  const location = useLocation();
  const formData = location?.state?.Data;
  const [otp, setOtp] = useState('');
  const [loading,setLoading]= useState(false)
  const navigate = useNavigate();
  
  // resend otp handler
    const resendOtpHandler= async()=>{
  
     const data = {
      email:formData.email,
      
     }

    const toastId = toast.loading("Sending otp...")
    try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create-otp`,data);
        if(!response.data.success){
          throw new Error("Error occur during SignUp")
        }
      toast.dismiss(toastId);
      //  pop out msg when otp send
       toast.success("Otp send succesfully");

    }catch(error){
       toast.dismiss(toastId);
       toast.error(error.response?.data?.message || " Something went wrong")
       console.log(error);
      

    }
   }

  //  varify otp
   const varifyOtpHandler = async()=>{
      if(otp.length <4){
        toast.error("please varify the otp");
        return;
      }

     const toastId =  toast.loading("Varifying otp ...");
     formData.otp = otp;

       try {
        setLoading(true);
       const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signUp`, formData);
         if(!response?.data?.success){
         throw new Error("Error occur during varifying otp");
         }

         toast.dismiss(toastId);
         toast.success(response?.data?.message);
         setLoading(false);
         navigate("/login");


       } catch (error) {
        console.log(error);
        toast.dismiss(toastId);
        toast.error(error.response?.data?.message);
        setLoading(false);
       }
   }


    useGSAP(()=>{
        gsap.from(".otpAnimation",{
          x:-100,
          opacity:0,
           delay:0.6,
           duration:0.6,
        })
    })



  return (
   <div className='flex flex-row'>
    {/* otp */}
      <div className='flex items-center justify-center h-[100vh] w-[50%] otpAnimation'>
      
      <div className='flex items-center justify-center flex-col gap-1'>
        <h2 className='font-semibold text-2xl'>We send you a code</h2>
        <p>please enter it below to verify your email</p>
        
        <p className='text-yellow-500 text-xs'>
          {formData?.email || "No email found"}
        </p>

      <div className='mt-6'>
           <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} 
          className='w-25 h-10 text-2xl text-center text-white bg-gray-600  border border-yellow-500 rounded-md'
          />}
        />
      </div>
      <div className='w-full mt-6'>
       <Button variant='contained' size="large"fullWidth
              sx={{
                  textTransform:"none",
                  backgroundColor: "#ff9800",
                  "&:hover": { backgroundColor: "#f57c00" }
                   }}
             onClick={varifyOtpHandler}
             disabled={loading}      
          >Varify otp</Button>
          { 
             loading && <i className="fa-solid fa-spinner text-b animate-spin -ml-8"></i>
             }
      </div>
      <div>
        <p className='mt-3'>Don't get the code? <span className='underline cursor-pointer ml-2 text-yellow-500 ' onClick={resendOtpHandler}>Resend code</span></p>
      </div>
    </div>
    </div>

    {/* Logo animation */}
        <div className='w-[50%] flex items-center justify-center  -ml-14'>
          <LogoAnimation/>
        </div>
   </div>
  );
}

export default Otp;