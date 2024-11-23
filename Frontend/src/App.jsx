import React from 'react'
import Left from './Home/leftPart/left'
import Right from './Home/rightPart/right'
import Signup from './Components/Signup'
import Login from './Components/Login'
import { useAuth } from './context/AuthProvider'
import { CiLogin } from 'react-icons/ci'
import {Route, Routes ,Link,Navigate} from 'react-router-dom';
// import Loading from './Components/Loading'
import {Toaster} from 'react-hot-toast';


function App() {

  const [authUser,setAuthUser]=useAuth();
  console.log(authUser)

  return (
  //  <Loading/>
    <>
     <Routes>
    <Route path="/" element={
      authUser?( 
      // <div className='flex h-screen'>
      //  <Left/>
      //    <Right/>
      //  </div>

<div className="drawer lg:drawer-open">
<input
  id="my-drawer-2"  // Change to match with the label in Right.jsx
  type="checkbox"
  className="drawer-toggle"
/>
  <div className="drawer-content flex flex-col items-center justify-center">
    <Right/>
    
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2"
     aria-label="close sidebar" 
     className="drawer-overlay">

     </label>


    <ul className="menu w-80 min-h-full bg-black text-base-content">
      <Left/>
    </ul>
  </div>
</div>


       )
     :(
      <Navigate to={"/login"}/>
     )
    }
    />

<Route path='/login' 
element={authUser?<Navigate to={"/"}/>:
<Login/>}></Route>
    
    <Route path='/signup' element={authUser?<Navigate to={"/"}/>:
    <Signup/>}></Route>
  </Routes>

  <Toaster /> 
    </>
 
  )
}

export default App