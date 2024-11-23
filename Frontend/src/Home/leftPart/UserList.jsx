import React from 'react'
import useConversation from '../../Components/zustand/useConversation.js'
import { useSocketContext } from '../../context/SocketContext.jsx';
// this file is to create the avatar and can be called multiple times in the users.jsx
function UserList( {user}) {
const {selectedConversation,setSelectedConversation}=useConversation();

const isSelected=selectedConversation?._id===user._id;

const {socket,onlineUsers}=useSocketContext()

const isOnline=onlineUsers.includes(user._id)


  return (
    <div className={`hover:bg-slate-600 duration-300 ${isSelected?"bg-slate-700 ": ""} `} onClick={()=>setSelectedConversation(user)}>
        
        <div className='flex space-x-4 py-3 px-6 hover:bg-slate-800 duration-300'>
        <div className={`avatar ${isOnline?"online":""}`}>
  <div className="w-12 rounded-full">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div>
<div>
  <h1 className=' font-semibold'>{user.fullName}</h1>
  <span>{user.email}</span>
</div>
        </div>
    </div>
  )
}

export default UserList