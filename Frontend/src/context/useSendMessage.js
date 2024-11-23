import React from 'react'
import useConversation from '../Components/zustand/useConversation.js';
import { useState } from 'react';
import axios from 'axios';
import sound from '../assets/send_notification.mp3'



function useSendMessage() {


    const [loading, setLoading] = useState(false);
    const { messages, setMessage, selectedConversation } = useConversation();


    const sendMessages = async (message) => {
        setLoading(true);
        
            try {
                const res = await axios.post(`/api/message/send/${selectedConversation._id}`,{message});
                console.log( res.data);



                // Flatten the response if it's an array of arrays
                // const flatMessages = res.data.flat(); // Flatten the array if it is nested

                const notification=new Audio(sound)
                notification.play()

                setMessage([...messages,res.data]);
                setLoading(false);

            } catch (error) {
                console.log('Error in the UsesendMessage file', error);
                setLoading(false);
            
        }
    };

  return (
    {loading,sendMessages}
  )
}

export default useSendMessage