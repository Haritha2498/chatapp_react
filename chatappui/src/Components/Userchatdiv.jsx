import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import wel from '/home/haritha/chatapp_react/chatappui/src/assets/Images/wel.jpg';

const Userchatdiv = () => {

    const [chats,setChats]=useState([])
    const navigate=useNavigate();
    const [message,setmessage]=useState('')
    const [friendmessage,setfriendmessage]=useState('')
    const [mymessage,setmymessage]=useState('')
    const [msg,setMsg]=useState('');

    const friendname=useParams();
    

    const name=friendname.friendname.toUpperCase();
    

    // function to send msg
    const submitmsg=async (msg)=>{
      
      const res=await fetch(`/api/sendmsg/${friendname.friendname}`,{
        method:"POST",
        headers:{"Content-Type":"application/json",},
        body: JSON.stringify(msg)
      })
      setmessage('')
      
    }
    const sendmessage = (e) => {
      e.preventDefault();
      console.log("tyujghhj")
      const msg = {
        message
      };
      setMsg(msg)
      
      // console.log(userDetails)
      submitmsg(msg);
  }

    // function to get msg

    useEffect(()=>{
      const getchats=async ()=>
      {
        try{
          const res=await fetch(`/api/getfriendmsg/${friendname.friendname}`)
          const data=await res.json();
          

          const mymessage = data[0];
          const friendmessage = data[1];
          setfriendmessage(friendmessage);
          setmymessage(mymessage);
          

          const flattenedData = data.flat();

          const sortedData = flattenedData.sort((a, b) => new Date(a.time) - new Date(b.time));
          

          setChats(sortedData);

          console.log(chats)

        }
        catch (error) {
          console.log("Error in loading getfriendmessages");
          console.log(error);
        }
      }
      getchats();
    },[msg])

    const extractDateAndTime = (timestamp) => {
              const date = new Date(timestamp);
              const dateString = date.toLocaleDateString();
              const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              return { date: dateString, time: timeString };
            };
  return (
    <>
    
    <div className="w-[70%]" style={{backgroundImage: `url(${wel})`,backgroundSize: 'cover',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',}} > 

        {/*  <a href="/personcontactinfo">  */}
        <div className="inline-flex bg-slate-400 p-8 w-full h-28" onClick={() => window.location.href = `/personalinfo/${friendname.friendname}`} >
            
            <img src="../src/assets/Images/dp2.jpeg"  className="w-14 h-14 ml-4 rounded-full " alt=""/>
        
            <span className="mt-4 ml-6 text-2xl" id="friendname">{name}</span>
        </div>

        
        
        
        <div className="h-[78%] pt-10 inline-flex w-[100%]">
            <span id="friendmsg" className="w-[100%] overflow-auto">

            {chats.map((message, index) => {
          const { date, time } = extractDateAndTime(message.time);
          return (

                <React.Fragment key={index}>
                <span className={mymessage.includes(message) ? "w-auto h-auto float-right text-lime-600 bg-gray-300 rounded-xl px-6 mr-10" : "h-auto bg-gray-300 float-left text-left text-lime-600 rounded-xl px-6 ml-10"}>
                    <span className=' text-red-700'>{message.msg}</span> <br />{time}{"  "}{date} 
                </span>
            <br />
            <br />
            <br/>
             </React.Fragment>
          );
})}
            </span>
            <br/>
        </div>

         {/* input section */}
            <form onSubmit={sendmessage}>
            <div className="inline-flex w-[100%] ">
            
            <input type="text" 
                    name="msg" 
                    id="msg" 
                    placeholder="type a message" 
                    className="w-2/3 ml-16 mt-6 h-8 border-[1px] border-black r pl-3 mb-2 rounded-full"
                    value={message}
                    onChange={(e)=>setmessage(e.target.value)}
                    />
            <button type="submit"> <img src="../src/assets/Images/send.png" alt="" className="w-6 h-6 mt-8 ml-20" /> </button>
            </div>
            </form>


    </div>
    
    
    </>
  )
}

export default Userchatdiv