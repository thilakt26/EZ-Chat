import React, { useEffect, useState } from 'react';
import useConversation from '../Components/zustand/useConversation.js';
import axios from 'axios';

function useGetMessage() {
    const [loading, setLoading] = useState(false);
    const { messages, setMessage, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            if (selectedConversation && selectedConversation._id) {
                try {
                    const res = await axios.get(`/api/message/get/${selectedConversation._id}`);
                    console.log(res.data); // Verify the response structure

                   
                    setMessage(res.data);
                } catch (error) {
                    console.log('Error in the UseGetMessage file', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        getMessages();
    }, [selectedConversation, setMessage]);

    return { loading, messages };
}

export default useGetMessage;
