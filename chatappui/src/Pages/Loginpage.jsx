import React, { useState } from 'react'
import login from '/home/haritha/chatapp_react/chatappui/src/assets/Images/login.jpeg';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style={
  backgroundImage:`url(${login})`,
  backgroundRepeat:'no-repeat',
  backgroundSize:'cover'
}

const Loginpage = () => {


  const [username,setusername]=useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate();


  const loginSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = {
      username,
      password,
    };
  
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    });

    console.log(res, "login res from /login");


    if (res.ok) { 
      console.log('/login resp json')
      return navigate("/home");
  
    }
    else if(res.status === 401){
      console.log("not exist")
      toast.error(`NO User exist`);
      return navigate("/login");
    }
    else if(res.status === 402){
      console.log("exist")
      toast.error(`check password`);
      return navigate("/login");
    }
    else 
    {
      console.log('/login json',)
      toast.error(`Please check your credentials`);
      return navigate("/");
    }
  
  }
  

  return (
    <>
    <div className=" h-screen w-full" style={style}>
    <br />

    <h2 className="text-5xl text-violet-700 mt-[5%] ml-[55%] ">LOG_IN</h2>
    <br />


    <div className="w-[40%] text-2xl ml-[50%] mt-[5%] border-2 border-violet-700 shadow-2xl shadow-gray-500 ">
        
        <form onSubmit={loginSubmit}>
            <input className="w-[50%] h-[5%] mt-[10%] ml-[20%] p-2 hover:bg-blue-100" 
                    type="text" 
                    placeholder=" User name"  
                    id="username" 
                    name="username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    
                    />
            <br/>
            <input className="w-[50%] h-[5%] mt-4 ml-[20%] p-2 hover:bg-blue-100" 
                    type="password" 
                    placeholder="Password" 
                    id="password" 
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    
                    />
            <br/> 
            <button className="w-3/6 h-10 bg-slate-100 border-2 rounded-2xl mt-10 ml-[20%] text-blue-700 hover:bg-blue-200" type="submit">LOG IN </button>
        </form>
    <p className="mt-10 mb-10 ml-[30%] text-violet-800">New User... <a href="/signup" className="text-blue-800 ml-10"> Sign_up</a> </p>
</div>

</div>
    
    </>
  )
}

export default Loginpage