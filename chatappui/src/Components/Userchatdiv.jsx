import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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
        }
        catch (error) {
          console.log("Error in loading getfriendmessages");
          console.log(error);
        }
      }
      getchats();
    },[msg])

    
  return (
    <>
    
    <div className="w-[70%] bg-slate-100"> 

        {/*  <a href="/personcontactinfo">  */}
        <div className="inline-flex bg-slate-400 p-8 w-full h-28" onClick={() => window.location.href = `/personalinfo/${friendname.friendname}`} >
            
            <img src="../src/assets/Images/dp2.jpeg"  className="w-12 ml-4 rounded-full " alt=""/>
        
            <span className="mt-4 ml-6" id="friendname">{name}</span>
        </div>

        
        
        
        <div className="h-[78%] bg-slate-200 pt-10 inline-flex w-[100%]">
            <span id="friendmsg" className="w-[100%] overflow-auto">

            {chats.map((message, index) => (
        <React.Fragment key={index}>
          <span className={mymessage.includes(message) ? "w-auto h-auto float-right text-lime-700 bg-gray-200 rounded-3xl px-6 mr-10" : "h-auto bg-gray-300 float-left text-left text-lime-800 rounded-3xl px-6 ml-10"}>
            {message.msg}
            </span>
            <br />
            <br />
             </React.Fragment>
          ))}
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