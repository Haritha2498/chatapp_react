import React from 'react'
import Chatdiv from '../Components/Chatdiv'
import Contactdiv from '../Components/Contactdiv'
import Firstdiv from '../Components/Firstdiv'
import Usercontacts from '../Components/Usercontacts'

const Homepage = () => {
  return (
    <>

    <div className="inline-flex w-full h-screen" >

    <Firstdiv/>
    <Usercontacts/>
    <Chatdiv/>
    
    </div>
    
    </>
  )
}

export default Homepage