import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
const Chatdiv = () => {

    const [profile,setProfile]=useState('')

    useEffect(()=>{
      const fetchprofile=async ()=>
      {
        try{
          console.log('hj')
          const res=await fetch('/api/getprofile')
          const data=await res.json()
          console.log(data,"kkk");
          setProfile(data)
        }
          catch (error){
            console.log("errorss",error)
          
        }
      }
      fetchprofile();
      console.log("profile fetched")
    },[])
    let name=profile.logeduser


  return (
    <>
    
    <div className="w-[70%] bg-yellow-50 "> 

        <p className="text-center mt-44 text-4xl font-bold">Hello,<span className='text-center mt-44 text-5xl font-bold '>{name}</span></p>
        <p className="text-center mt-20 text-4xl font-bold">BEGIN A CHAT <br />HERE.. </p>
            

    </div>
    
    </>
  )
}

export default Chatdiv