import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Personalinfpage = () => {

    const name=useParams();
    console.log(name)


    const [frienddetails,setFreinddetails]=useState([]);
    useEffect(()=>{

        const fetchfrienddetails=async ()=>
        {
            try{
                const res=await fetch(`/api/getpersonalinfo/${name.friendname}`)
                const data=await res.json();
                console.log("data fetched");
                setFreinddetails(data);
                console.log(data)
            }
            catch (error){
                console.log("errorss",error)
            }
        }
        fetchfrienddetails();
    },[])
  return (
    <>
    
    <div className="h-screen">
    <div className="w-8/12 bg-gray-200 mx-auto mt-[5%] p-10 h-[80%]">
        <p className="text-2xl font-semibold">PERSON PROFILE</p>
        <a onClick={() => window.location.href = `/chat/${name.friendname}`}> <p className="text-2xl font-semibold float-right">HOME</p></a>
        <div className="grid gap-4 mt-10 h-[60%]">
            <img src="../src/assets/Images/dp2.jpeg" alt="" className="w-48 ml-20 h-48"/>

            <div className="inline-flex">
                <p className=" text-xl ml-20">NAME:</p>
                <span id="name" className="text-teal-700 text-2xl ml-2">{frienddetails.usename}</span>
            </div>
            <div className="inline-flex">
                <p className=" text-xl ml-20">EMAIL:</p>
                <span id="email" className="text-teal-700 text-xl ml-2">{frienddetails.email}</span>
            </div>
            <div className="inline-flex">
                <p className=" text-xl ml-20">ABOUT:</p>
                <span id="about" className="text-teal-700 text-xl ml-2">{frienddetails.about}</span>
            </div>
        </div>
        
         {/* <p className="text-red-700 font-bold">DELETE CHATS</p> */}
        {/* <p className="text-red-700 font-bold">BLOCK USER</p>  */}

    </div>
</div>

    
    
    
    
    </>
  )
}

export default Personalinfpage