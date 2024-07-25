import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SettingsComponent = () => {


    const [setname,setSetname]=useState('')
    const [about,setAbout]=useState('')
    const navigate=useNavigate();


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

        if(res.ok){
            toast.success('Profile Updated,Click home...');
            navigate("/home")
        }
        // else if(res.ok){
        //     toast.success('Profile Created,Click home...');
        //     return navigate("/home")
        // }
        else{
            return navigate("/setting");
        }
    }

    const [profile,setProfile]=useState('')

    useEffect(()=>{
      const fetchprofile=async ()=>
      {
        try{
          const res=await fetch ("api/profile");
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


  return (
    <>
    
    <div className="w-10/12  h-screen bg-slate-200 mx-auto  ">
        <br/>
        <p className="text-lime-700 text-3xl font-semibold ml-24 mt-10">Profile</p>
        <a href="/home"> <button className="float-right mr-20 text-lime-700 text-3xl font-semibold">HOME</button> </a>

        <img src="./src/assets/Images/dp2.jpeg" alt="no image" className="w-2/12  mt-16 mx-auto rounded-full"/>


        <form onSubmit={submitform}>
            <div className="w-4/12 bg-slate-100 ml-32 mt-24 h-24"> 
            <p className="text-lg ml-8 text-yellow-600">NAME:</p>
            <input type="text" 
              name="setname" 
              id="setname" 
              className="w-10/12 h-16 ml-8 bg-slate-100"
              placeholder={profile.setname}
              value={setname}
              onChange={(e) => setSetname(e.target.value)}
            />
            </div>

            <div className="w-4/12 bg-slate-100 ml-32 mt-24 h-24"> 
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
    </div>
    
    </>
  )
}

export default SettingsComponent