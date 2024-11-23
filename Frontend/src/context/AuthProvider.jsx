import React, { createContext, useContext, useState } from 'react'
import Cookies from 'js-cookie';


export const AuthContext=createContext();

export const AuthProvider=({children})=>{


    //I am not clear about this code have to review !!
    const initialUserState=Cookies.get("jwt")||localStorage.getItem("ChatApp");

    //parse the user data and storing in state

    const [authUser,setAuthUser]=useState(initialUserState ? JSON.parse(initialUserState):undefined);

  return (
   < AuthContext.Provider value={[authUser,setAuthUser]}>
    {children}
   </AuthContext.Provider>
  )
}

export const useAuth=()=>useContext(AuthContext);