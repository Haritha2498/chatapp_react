import React, { useEffect, useState } from 'react'
import Firstdiv from '../Components/Firstdiv'
import Usercontacts from '../Components/Usercontacts'
import Userchatdiv from '../Components/Userchatdiv'
import Firstdivchat from '../Components/Firstdivchat'
import { useParams } from 'react-router-dom'
import Userblock from '../Components/Userblock'

const Chatpage = () => {



    const friendname=useParams();
    const friend=friendname.friendname;
    console.log(friend,"inside chatpage")
    const [valid,setValid]=useState('')

    //function to check blockstatus of friend

  useEffect(()=>{
    const fetchvalid=async()=>{
    try{
      console.log(friend,"gh");
      const res=await fetch(`/api/isvalid/${friend}`);
      const data=await res.json()
      console.log(data,"jk");
      setValid(data);
      

    }
    catch (error){
      console.log("errorss",error)
    }}
    fetchvalid()
  },[])


  
  return (
    <>
    <div className="inline-flex w-full h-screen" >
    <Firstdivchat/>
    <Usercontacts/>
    {valid === 0 ? <Userblock /> : <Userchatdiv />}
    </div>
    </>
  )
}

export default Chatpage