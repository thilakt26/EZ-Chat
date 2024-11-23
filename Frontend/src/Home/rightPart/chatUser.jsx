import React from 'react'
import useConversation from '../../Components/zustand/useConversation.js';
import { useSocketContext } from '../../context/SocketContext.jsx';
import { CiMenuFries } from 'react-icons/ci';

function ChatUser() {

const {selectedConversation}=useConversation()

const {onlineUsers}=useSocketContext()
// console.log("selected :",selectedConversation)//shows the chatuser who has been selected from you


const getOnlineUsersStatus=(userId)=>{
return onlineUsers.includes(userId)?"online":"offline"
}

  return (

<div className=' relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-l-md'>

<label htmlFor="my-drawer-2"
  className="btn btn-ghost drawer-button lg:hidden absolute left-5">

<CiMenuFries
 className='text-white text-xl'/>
 </label>



<div className='px-4 pt-1 h-[10vh] flex space-x-4 items-center bg-gray-800 hover:bg-gray-700 duration-500 '>
        <div className={`avatar ${onlineUsers.includes(selectedConversation._id)?"online":""} `}>
  <div className="w-16 rounded-full">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div>
<div>
    <h1 className='text-xl font-bold'>{selectedConversation.fullName}</h1>
    <span className='text-sm font-semibold'>{getOnlineUsersStatus(selectedConversation._id)}</span>
</div>
    </div>

</div>

    
  )
}

export default ChatUser