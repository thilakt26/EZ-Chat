import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from '../../context/useGetAllUsers.jsx'
import useConversation from '../../Components/zustand/useConversation.js'
import { all } from 'axios';

import {toast} from 'react-hot-toast'
function Search() {

  const [search,setSearch]=useState("")

  const [allUsers]=useGetAllUsers()
  const {setSelectedConversation}=useConversation()


  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!search) return;
  
    const conversation = allUsers.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
  
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };
  
  return (
  <div className='h-[10vh]'>
<div className='px-5 py-4'>
<form onSubmit={handleSubmit}>
<div className='flex  space-x-3'>
    {/* //this div is created for keeping icon and bar in single line */}
<label className="border-[1px] rounded-lg px-2   flex items-center gap-2 w-[80%]">
  <input  type="text" className="grow outline-none bg-inherit" placeholder="Search" 
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
  />
  
</label>
<button><FaSearch className='text-5xl px-2 hover:bg-gray-800 rounded-full duration-300' /></button>

</div>
</form>

    </div>
  </div>
  )
}

export default Search