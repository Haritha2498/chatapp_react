import React from 'react'
import Firstdiv from '../Components/Firstdiv'
import Usercontacts from '../Components/Usercontacts'
import Userchatdiv from '../Components/Userchatdiv'
import Firstdivchat from '../Components/Firstdivchat'

const Chatpage = () => {
  return (
    <>
    <div className="inline-flex w-full h-screen" >
    <Firstdivchat/>
    <Usercontacts/>
    <Userchatdiv/>
    </div>
    </>
  )
}

export default Chatpage