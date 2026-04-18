const OTP = require("../models/otp");
const otpGenerator = require("otp-generator");
const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt =  require('jsonwebtoken');

//--------- create and send otp------
exports.createOtp = async(req,res)=>{
    try{
        // fetch   the email
       const {email} = req.body;
    //    validation
    if(!email){
        return res.status(400).json({
            success:false,
            message: "please fill all the input fileds",
        });
    }
    // check is user already have an account 
    const userDetails = await User.findOne({email:email});

    if(userDetails){
        return res.status(400).json({
            success:false,
            message:"User already have an account",
        })
    }


//   generate a otp 
// with 4 digit and ignote special carr,uppercase,lowercae, mens only number are allowed
    const newOtp = otpGenerator.generate(4,{
        specialChars:false,
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
    });

    // Create entry on DB
     const newOpt = await OTP.create({
        email:email,
        otp:newOtp,
     })

// return response
return res.status(200).json({
    success:true,
    message:"Otp send successfully",
    newOpt,
})


    }catch( error) {
        console.log(error);
         return res.status(500).json({
            success: false,
            message:"internal server error",
         })

    }
}

// ----------SIGNUP---------
// signUP(1.fetchdata,2.validation,3.password==confirmpass,4.check is user already exst ir not,5.veryfy otp
//6.hash the password,7.create profile picture,8.crete entry in db,9. return response )
exports.signUp = async (req,res)=>{
 try{
    // fetch data
    const {firstName,lastName,email,password,confirmPassword,otp} = req.body;
    // validation
    if(!firstName || !lastName|| !email || !password || !confirmPassword || !otp){
        return res.status(4000).json({
            success:false,
            message :"please fill all the input field",
        })
    }
    // check password and confirmpassword same or  not
      if(password !== confirmPassword){
          return res.status(400).json({
            success:false,
            message:"password and confirmpassword not same."
          })
      }
    //   user already register or not 
    const userExistence = await User.findOne({email:email});
     

     if(userExistence){
        return res.status(400).json({
            success:false,
            message:" user already registered"
        })
     }
    // find latest otp (in case user click resend otp multiple times)
    const latestOtp = await OTP.findOne({email:email}).sort({createdAt:-1});
       
    if(!latestOtp){
        return res.status(404).json({
            success:false,
            message:"Otp not found"
        })
    }
    // varify otp 
    if(otp !== latestOtp.otp){
         return res.status(404).json({
            success:false,
            message:"Otp not matched"
        })
    }
    // hashed the password so install bcrypt
    const hashedPassword = await bcrypt.hash(password,10);
  
    // create profile picture  this is the api  (((  https://api.dicebear.com/7.x/initials/svg?seed=${firstName}%20${lastName})))
    const profilePicture = await `https://api.dicebear.com/7.x/initials/svg?seed=${firstName}%20${lastName}`
     
    //  create entry in DB
       const newUser =  await User.create({
          firstName:firstName,
          lastName:lastName,
          email:email,
          password:hashedPassword,
          profilePicture:profilePicture,
       })
    //   return response
    return res.status(200).json({
            success:true,
            message:"Account created successfully",
            newUser:newUser,
        })


  }catch(error){
    console.log(error);
    return res.status(500).json({
            success:false,
            message:"Internal server error"
        })

 }
}

// -----------LOGIN-----------------
// 1.fetch data ,2. validation,3.is emilregisterd or not,4.compare passward,5.create token,6.return response
exports.logIn = async (req,res)=>{
 try{
    // fetch daata
    const {email,password} = req.body;
//  validation
if(!email || !password){
    return res.status(400).json({
        success:false,
        message:"please fill all the input fields",
    })
}
// check is email registered or not
const userDetails = await User.findOne({email:email});
  if(!userDetails){
    return res.status(400).json({
        success:false,
        message:"email not registered",
    })
  }

//   check password ( compare password)
const isMatched = await bcrypt.compare(password,userDetails.password);
//   password sahi hai (we have to give token)
  if(isMatched){
    // payload (we can store user_data)
       const payload = {
             userId:userDetails._id,
             userEmail:userDetails.email,
       } 
//   create token 
         const token = jwt.sign(payload,process.env.JWT_SECRETE,{
            expiresIn:"2hr"
         });
      
        //  create object for response
        const user1 = userDetails.toObject();
        user1.password=undefined;
        
        user1.token = token;

//   return response  
     return res.status(200).json({
        success:true,
        message:" User logIn successfully",
        userDetails:user1,
    })
   

    // password galat hai
   }else{
      return res.status(403).json({
        success:false,
        message:"password not matched",
    });
  }

 }catch(error){
      console.log(error);
      return res.status(500).json({
        success:false,
        message:"Internalserver error",
    })
 }
}


// send otp for resend password 
exports.sendOtpForgotPassword = async(req,res)=>{
    try{
        // fetch   the email
       const {email} = req.body;
    //    validation
    if(!email){
        return res.status(400).json({
            success:false,
            message: "please fill all the input fileds",
        });
    }
    // check is user already have an account 
    const userDetails = await User.findOne({email:email});

    if(!userDetails){
        return res.status(400).json({
            success:false,
            message:"User  not resistered",
        })
    }


//   generate a otp 
// with 4 digit and ignote special carr,uppercase,lowercae, mens only number are allowed
    const newOtp = otpGenerator.generate(4,{
        specialChars:false,
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
    });

    // Create entry on DB
     const newOpt = await OTP.create({
        email:email,
        otp:newOtp,
     })

// return response
return res.status(200).json({
    success:true,
    message:"Otp send successfully",
    newOpt,
})


    }catch( error) {
        console.log(error);
         return res.status(500).json({
            success: false,
            message:"internal server error",
         })

    }
}

// varify otp
exports.forgotPasswordOtpVerify = async(req,res)=>{
    try {
        // fetch data
        const{ otp,email} = req.body;
        //  otp validation
        if(!otp){
            return res.status(400).json({
                success:false,
                message:"please fill the otp"
            })
        }
        // email validation
        if(!email){
            return res.status(400).json({
                success:false,
                message:"Something went wrong"
            })
        }

        // find latest otp
        const latestOtp = await OTP.findOne({email:email}).sort({createdAt:-1});
         if(!latestOtp){
            return res.status(404).json({
                success:false,
                message:"otp  expired "
            })
         }
        // varify the otp 
        if(latestOtp.otp !== otp){
            return res.status(403).json({
                success:false,
                message:"Otp not matched"
            })
        }
        // return response
         return res.status(200).json({
            success:true,
            message:"Otp matched successfully"
         })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
        
    }
}

// Reset password
exports.resetPassword = async(req, res) => {
    try {
        // fetch data
        const {password, confirmPassword,email} = req.body;

        // validation
        if (!password || !confirmPassword || !email) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the input fields"
            })
        }
        //  check password and confirmPassword same  or not
        if (password !== confirmPassword) {
            return res.status(400).json({
                success:false,
                message:"password and confirmPassword not matched"
            })
        }

        // hashed the password 
        const hashedPassword = await bcrypt.hash(password,10);
        //  update password 
         const updatedPassword = await User.findOneAndUpdate({email:email},
                 {password:hashedPassword},{new:true})
        // return response
         return res.status(200).json({
            success:true,
            message:"Password update sucessfully"
         })

    } catch (error) {
        // error handling
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
