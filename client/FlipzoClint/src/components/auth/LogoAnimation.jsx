import { useGSAP } from '@gsap/react'
import React from 'react'
import gsap from "gsap"

function LogoAnimation() {

useGSAP(()=>{
  const t1 = gsap.timeline();

  t1.from(".flip",{
    x:200,
    opacity:0,
    delay:0.3,
    duration:0.6,
  });

  t1.from(".zoLogo",{
    y:200,
    opacity:0,
    delay:0.3,
    duration:0.6,
  },"-=1")
})



  return (
    <div>
      <h1 className='text-6xl font-bold flex items-center'>
        <p className='flip'>Flip</p>
        <p className='text-orange-400 text-9xl inline-block zoLogo'>Zo</p>
        </h1>
    </div>
  )
}

export default LogoAnimation