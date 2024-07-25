import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'


const Firstdivchat = () => {

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

    const navigate=useNavigate();
    const logout=async()=>{

      if (confirm("Are you sure you want to log out?")) {
        try{
        const res=await fetch ('/api/logout');
            if(res.ok){
                // toast.success("Logout Success")
                console.log("logout")
                navigate('/');
            }
        }
        catch(error){
          console.log("errror in logout")
        }}

    }

  return (
    <>
    
    <div className="w- bg-black w-[10%] text-gray-200"> 

        <img src="../src/assets/Images/dp2.jpeg"  className="w-[40%] mx-auto rounded-full mt-10" alt=""/>
        <h3 className="text-base mt-4 text-center" id="userprofilename">{profile.logeduser}</h3>

        <a href="/home"> <img src="../src/assets/Images/msg.jpeg" alt="" className="bg-black mt-14 w-[60%] mx-auto"/> </a>
        <h4 className="text-center">HOME</h4>

        <a href="/setting"><img src="../src/assets/Images/setting.png" alt="" className=" w-[40%] mx-auto mt-14"/></a> 
        <h4 className="text-center">SETTING</h4>

        <h3 className="mt-20 ml-[30%] mr-[30%] "><button onClick={logout} >Logout</button></h3>

    </div>
    
    </>
  )
}

export default Firstdivchat