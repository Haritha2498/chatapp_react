import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


import wel from '/home/haritha/chatapp_react/chatappui/src/assets/Images/wel.jpg';


const style={
    backgroundImage:`url(${wel})`,
    backgroundRepeat:'no-repeat',
    backgroundSize:'cover'
}

const Personalinfpage = () => {

    const name=useParams();
    console.log(name)
    console.log(name.friendname)
    const navigate=useNavigate();


    const blockfriendname={name:name.friendname}
    console.log(blockfriendname,"gh")
    const [frienddetails,setFreinddetails]=useState([]);

    //function to display freind details

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

    //function to block user

    const blockuser=async()=>{
        console.log("userblocked")
        const confirm=window.confirm('Sure want to block friend:');
        if(!confirm) return;
        console.log("blocking")
        const res=await fetch('/api/blockuser',{
        method:"POST",
        headers:{"Content-Type":"application/json",},
        body: JSON.stringify(blockfriendname)
        })
        if (res.ok) {
            alert('User has been blocked successfully.');
            navigate(`/chat/${name.friendname}`);
        } 
    }

return (
    <>
    
    <div className="h-screen" style={{backgroundImage: `url(${wel})`,backgroundSize: 'cover',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',}}>
        <br />
    <div className="w-8/12 bg-gray-100 opacity-80 mx-auto mt-[5%]  p-10 h-[80%]">
        <p className="text-3xl font-semibold">PERSON PROFILE</p>
        <a onClick={() => window.location.href = `/chat/${name.friendname}`}> <p className="text-2xl font-semibold float-right">HOME</p></a>
        <div className="mt-10 h-[50%] inline-flex w-[100%]">
            
            <div className='inline-grid w-[40%]'>
            <div className="inline-flex">
                <p className=" text-2xl ml-[15%]">NAME:</p>
                <span id="name" className="text-teal-800 text-2xl ml-8">{frienddetails.usename}</span>
            </div>
            <div className="inline-flex">
                <p className=" text-2xl ml-[15%]">EMAIL:</p>
                <span id="email" className="text-teal-700 text-2xl ml-8">{frienddetails.email}</span>
            </div>
            <div className="inline-flex">
                <p className=" text-2xl ml-[15%]">ABOUT:</p>
                <span id="about" className="text-teal-700 text-2xl ml-8">{frienddetails.about}</span>
            </div>
            </div>
            <div className='inline-flex ml-[20%]'>
            <img src="../src/assets/Images/dp2.jpeg" alt="" className="w-[90%] h-[70%] ml-[5%] rounded-2xl"/>
            </div>
        </div>
        
         {/* <p className="text-red-700 font-bold">DELETE CHATS</p> */}
        <button className="text-red-700 font-bold" onClick={blockuser}>BLOCK USER</button> 
    </div>
    </div>
    </>
    )
}

export default Personalinfpage