import { createContext, useContext, useEffect, useState } from "react";
import {useAuth} from './AuthProvider.jsx'
import {io} from 'socket.io-client'

const socketContext=createContext();

//it is an hook 
export const useSocketContext=()=>{
return useContext(socketContext)
}

export const SocketProvider=({children})=>{
    const [socket,setSocket]=useState(null);
    const [authUser]=useAuth();
    const [onlineUsers,setOnlineUsers]=useState([])

    useEffect(()=>{

        if(authUser){
            const socket=io("http://localhost:4002",{
            query:{
                userId:authUser.user._id,

            },
        })
        setSocket(socket)

        //online state updation data from backend
        socket.on("getOnlineUsers",(users)=>{

            setOnlineUsers(users)
        })
        return ()=>socket.close()
    }
    else{
        if(socket ){
            socket.close();
            setSocket(null)
        }
    }

},[authUser]);

return(

    <socketContext.Provider value={{socket,onlineUsers}}>
        {children}
    </socketContext.Provider>
)
}