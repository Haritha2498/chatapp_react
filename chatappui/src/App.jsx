import { useState } from 'react'
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from 'react-router-dom'
import WelcomePage from './Pages/WelcomePage'
import Signuppage from './Pages/Signuppage'
import Loginpage from './Pages/Loginpage'
import Homepage from './Pages/Homepage'
import Settingpage from './Pages/Settingpage'
import Chatpage from './Pages/Chatpage'
import Personalinfpage from './Pages/Personalinfpage'
import Mainlayout from './Layout/Mainlayout'
import Authlayout from './Layout/Authlayout'


function App() {



  const router=createBrowserRouter(
    createRoutesFromElements(

<>

<Route path="/" element={<Authlayout/>} >
    <Route path="/" element={<WelcomePage />}/>
    <Route path='/signup' element={<Signuppage />}/>
    <Route path='/login' element={<Loginpage />}/>
    <Route path='/setting' element={<Settingpage/>}/>
    <Route path='/personalinfo/:friendname' element={<Personalinfpage/>}/>
  </Route>


  <Route path="/" element={<Mainlayout/>} >
    
      <Route path='/home' element={<Homepage/>}/>
      
      <Route path='/chat/:friendname' element={<Chatpage/>}/>
</Route>



      
</>
    )
  )


  return (
    <>
    
    <RouterProvider router={router} />
    </>
  )
}


export default App
