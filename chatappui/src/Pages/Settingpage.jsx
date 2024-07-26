import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import SettingsComponent from '../Components/SettingsComponent'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';


import wel from '/home/haritha/chatapp_react/chatappui/src/assets/Images/wel.jpg';

const Settingpage = () => {
 
    

    const [setname,setSetname]=useState('')
    const [about,setAbout]=useState('')
    const navigate=useNavigate();

    //function to change user profile

    const submitform= async (e) => {
        e.preventDefault();
        const formdetails={
            setname,
            about
        };

        const res=await fetch("api/changeprofile",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(formdetails),
        });

        console.log(formdetails)
        console.log(res,"result")

        if(res.status===200){
            toast.success('Profile Created');
            navigate("/home")
        }
        else if(res.status===201){
            toast.success('Profile Updated');
            console.log("updated")
            return navigate("/home")
        }
        else{
            return navigate("/setting");
        }
    }


    const [profile,setProfile]=useState('')

    //function to display user details as placeholder values

    useEffect(()=>{
      const fetchprofile=async ()=>
      {
        try{
          const res=await fetch ("api/profile");
          const data=await res.json()
          console.log(data,"kkk");
          if(!data){
            data.setname="user",
            data.about="about"
          }
          setProfile(data)
        }
          catch (error){
            console.log("errorss",error)
          
        }
      }
      fetchprofile();
      console.log("profile fetched")
    },[])

    //function to delete a user

    const deleteuser=async()=>{
      console.log("delete")
      const confirm=window.confirm('Sure want to delete account');
      if(!confirm) return;
      console.log("delete")
      const res= await fetch('/api/delete',{
        method:'DELETE'
      });
      const response=await fetch ('/api/logout');
      if(response.ok){
        console.log("logout")
        navigate('/');
      }

}



  return (
    <>
    
    <div className="w-10/12  h-screen mx-auto  " style={{backgroundImage: `url(${wel})`,backgroundSize: 'cover',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',}}>
        <br/>
        <p className="text-lime-700 text-3xl font-semibold ml-24 mt-10">Profile</p>
        
        <a href="/home"> <button className="float-right mr-[20%] text-lime-700 text-3xl font-semibold">HOME</button> </a>
        <br />

        <img src="./src/assets/Images/dp2.jpeg" alt="no image" className="w-2/12  mt-28 mx-auto rounded-2xl float-right"/>


        <form onSubmit={submitform}>

            <div className="w-4/12 bg-slate-100 ml-32 mt-28 h-24"> 
            <p className="text-lg ml-8 text-yellow-600">NAME:</p>
            
            <input type="text" 
              name="setname" 
              id="setname" 
              className="w-10/12 h-16 ml-4 bg-slate-100"
              placeholder={profile.setname}
              value={setname}
              onChange={(e) => setSetname(e.target.value)}
              />
            </div>

            <div className="w-4/12 bg-slate-100 ml-32 mt-28 h-24"> 
            <p className="text-lg ml-8 text-yellow-600">ABOUT: </p>
        
            <input type="text"
              name="about" 
              id="about" 
              className="w-10/12 h-16 ml-8 bg-slate-100"
              placeholder={profile.about}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            </div>
            <button type="submit" className="text-lime-700 text-2xl font-semibold ml-40 mt-8 border-2 border-gray-400 rounded-xl p-2" >change</button>

        </form>

        <button class=" ml-[10%] mt-[5%] text-red-700 text-xl font-semibold" onClick={deleteuser}>DELETE ACCOUNT..</button> 
    </div>
    
    </>
  )
}

   
export default Settingpage