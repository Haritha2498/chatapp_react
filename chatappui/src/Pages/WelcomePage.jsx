import React from 'react'
import img3 from '/home/haritha/chatapp_react/chatappui/src/assets/Images/im3.jpg';


const style={
  backgroundImage:`url(${img3})`,
  backgroundRepeat:'no-repeat',
  backgroundSize:'cover'
}

const WelcomePage = () => {
  return (
    <>
    <div className=" h-screen w-full" style={style}>
      <br />
    
    <div className="w-4/12 h-[60%] bg-sky-100 mt-[10%]  mx-auto p-10 text-indigo-600">
        <h1 className="text-4xl text-center">WELCOME</h1>
        <h1 className="text-2xl text-center">TO</h1>
        <h1 className="text-5xl text-center"> CHATLY</h1>
        <p className="text-center mt-11 text-xl">Connect and Chat with your loved ones..</p>
        <button className="border-blue-800 border-2 p-2 w-6/12 rounded-2xl mt-8 ml-[25%]">
            <a href="/signup">SIGN_UP</a> 
        </button>
        <h3 className="text-center mt-8">Already a user..</h3>
        <button className="border-blue-800 border-2 p-2 w-6/12 rounded-2xl mt-8 ml-[25%]">
            <a href="/login">LOG_IN</a> 
        </button>

    </div>
    </div>
    </>
  )
}

export default WelcomePage