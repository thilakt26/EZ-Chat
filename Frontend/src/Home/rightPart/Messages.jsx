import React, { useEffect,useRef } from 'react'
import Message from './Message.jsx';
import useGetMessage from '../../context/useGetMessage.js';
import Loading from '..//../Components/Loading.jsx'
import useGetSocketMessage from '../../context/useGetSocketMessage.js';
function Messages() {

const {loading,messages}=useGetMessage();
// console.log("message from messages ",messages )

useGetSocketMessage();//to listen the message list in real time 

//to scroll the last sent message as msg sent one by one
const lastMsgRef=useRef();
useEffect(()=>{
  setTimeout(()=>{
    if(lastMsgRef.current){
      lastMsgRef.current.scrollIntoView({behavior:"smooth"})

    }
  },100)

},[messages])


  return (
    <div className='flex-1 overflow-y-auto' style={{minHeight:"calc(90vh - 8vh)"}}>
      

      {loading?(<Loading/>):(messages.length>0 && messages.map((message)=>(
        <div
          key={message._id} ref={lastMsgRef}>

          <Message  message={message}/>
        </div>
         
             )) )}
      
      {!loading && messages.length===0 &&(
        <div>
          <p className='text-center mt-[20%]'>Say Hi to Start the Chat </p>
        </div>
      )}
      
      
    </div>
  )
}

export default Messages