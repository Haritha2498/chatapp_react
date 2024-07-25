import React from 'react'
import Firstdiv from '../Components/Firstdiv'
import Usercontacts from '../Components/Usercontacts'
import { Outlet } from 'react-router-dom'

const Mainlayout = () => {
  return (
    <>
    {/* <div className="inline-flex w-full h-screen" > */}
    {/* <Firstdiv/> */}
    {/* <Usercontacts/> */}
    <Outlet/>
    {/* </div> */}
    </>
  )
}

export default Mainlayout