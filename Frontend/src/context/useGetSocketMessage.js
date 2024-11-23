import React, { useEffect } from 'react'
import useConversation from '../Components/zustand/useConversation.js'
import { useSocketContext } from './SocketContext'
import sound from '../assets/recv_notification.wav'

const useGetSocketMessage=()=> {

    const {socket}=useSocketContext()

    const {messages,setMessage}=useConversation()

    useEffect(()=>{
        socket.on("newMessage",(newMessage)=>{

            const notification=new Audio(sound) 
            notification.play()

            setMessage([...messages,newMessage])

        })
            return ()=>{
                socket.off("newMessage")
            }
        
    },[socket,messages,setMessage])
  
}

export default useGetSocketMessage