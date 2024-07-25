import React from 'react'
import signup from '/home/haritha/chatapp_react/chatappui/src/assets/Images/signup.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style={
  backgroundImage:`url(${signup})`,
  backgroundRepeat:'no-repeat',
  backgroundSize:'cover'
}

const Signuppage = () => {



    const [username,setUsername]=useState('');
    const [useremail,setuserEmail]=useState('');
    const [password,setPassword]=useState('');

    const navigate=useNavigate();


    const signupSubmit=async (userDetails)=>{
      console.log(userDetails,"trt")
      const res=await fetch('/api/signup',{
          method:"POST",
          headers:{"Content-Type":"application/json",},
          body: JSON.stringify(userDetails)
      })
      console.log(userDetails)
      console.log(res);
      if (res.ok) {
        toast.success(`Signup success`);
        return navigate("/setting");

      } else if(res.status === 401){
        console.log("exist")
        toast.error(`User already exist with this username`);
        return navigate("/signup");
      }
      else if(res.status === 402){
        console.log("exist")
        toast.error(`User already exist with this email id`);
        return navigate("/signup");
      }

      else
      {
        toast.error(`Please check the input data`);
        return navigate("/signup");
      }
    }


    const submitform = (e) => {
      e.preventDefault();
      console.log("tyujghhj")
      const userDetails = {
        username,
        useremail,
        password

      };
      // console.log(userDetails)
      signupSubmit(userDetails);
  }

  return (
    <>
    
    <div className=" h-screen w-full" style={style}>
      <br />

<h2 className="text-5xl text-blue-800 mt-[5%] ml-[5%]">SIGN UP</h2>
    <div className="w-[55%] text-2xl ml-[5%] mt-[5%] border-2 border-slate-300 shadow-2xl shadow-gray-500" >

        <h3 className="ml-24 text-gray-800 mb-6">Create a new Account</h3>

<form onSubmit={submitform}>

    <input className="w-[50%] h-[5%] mt-4 ml-[20%] p-2 bg-slate-100  hover:bg-blue-100" 
          type="text" 
          placeholder=" User name"  
          id="username"
          name="username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          
          />
    <br/>
    <input className="w-[50%] h-[5%] mt-4 ml-[20%] p-2 hover:bg-blue-100" 
            type="email"
            placeholder="Email id"  
            id="email" 
            name="email"
            value={useremail}
            onChange={(e)=>setuserEmail(e.target.value)}
            />
    <br/>
    <input className="w-[50%] h-[5%] mt-4 ml-[20%] p-2 hover:bg-blue-100" 
          type="password" 
          placeholder="Password"  
          id="password" 
          name="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
    {/* <span id="pid1" className="text-emerald-500 ml-[30%] mt-10"> </span>
    <br/>
    <input className="w-[50%] h-[5%] mt-4 ml-[20%] p-2 hover:bg-blue-100" type="password" placeholder="Password again"  id="pass2" name="pass2"/>
    <br/>
    
    <span id="pid2" className="text-red-500 ml-[30%] mt-10"></span>
    <br/> */}
    <button className="w-3/6 h-10 bg-slate-100 border-2 rounded-2xl mt-12 ml-[20%] text-blue-700 hover:bg-blue-200" type="submit" > SIGN UP  </button>

</form>

    <p className="text-center mt-10 text-gray-800">Already a user.. <a href="/login" className="text-blue-800 ml-10"> login </a> </p>
    

</div>

</div>
    
    
    </>
  )
}

export default Signuppage