import React from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

const Userblock = () => {

    const friendname=useParams();
    const navigate=useNavigate();
    
    const friend={friend:friendname.friendname}
    const navf=friendname.friendname
    console.log(navf,"hgfhjds");

    //function to unblock user

    const unblock=async()=>{
      console.log("unblocking")
      const confirm=window.confirm('Sure want to unblock friend:');
      if(!confirm) return;
        console.log(friend,"hgfds");
      const res=await fetch('/api/unblockuser',{
        method:"POST",
        headers:{"Content-Type":"application/json",},
        body: JSON.stringify(friend)
      })
      console.log(" user unblocked")
      if(res.ok){
        window.location.reload();
      }
      
}
  return (
    <>
    
    
    <div className="w-[70%] bg-yellow-50 "> 
        <p className="text-center mt-[20%] text-4xl font-bold">You blocked this contact</p>
        <p className="text-center mt-[2%] text-4xl font-bold"> Click here to Unblock...</p>
        <button className="text-center mt-[2%] ml-[45%] text-green-600 text-2xl font-bold" onClick={unblock}>UNBLOCK</button>
    </div>
    
    
    </>
  )
}

export default Userblock