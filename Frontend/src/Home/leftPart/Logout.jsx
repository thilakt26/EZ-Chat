import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import axios from 'axios';
import Cookies from 'js-cookie'
import toast from 'react-hot-toast';

function Logout() {

  const [loading,setLoading]=useState(false);
  const handleLogout=async (req,res)=>{
    setLoading(true)
    try {
      await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false)
      toast.success("Logged out Successfully");
      window.location.reload()
    } catch (error) {
      console.log("error in Logout", error);
      
    }

  }

  return (
   <div className='h-[10vh] '>
    <div>
     <CiLogout  className='text-5xl text-white hover:bg-slate-600 duration-300 cursor-pointer rounded-md p-2 ml-2 mt-1 ' onClick={handleLogout}/>
     </div>
   </div>
  )
}

export default Logout