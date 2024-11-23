import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");
        const response = await axios.get("/api/user/allusers", {
          credentials: "include",
          headers: { Authorization: `Bearer ${token}` } // Fixed typo here
        });

        setAllUsers(response.data);
      } catch (error) {
        console.log("Error in useGetAllUsers:", error);
      } finally {
        setLoading(false); // Ensures loading is set to false even if an error occurs
      }
    };

    getUsers(); // Call the function here
  }, []);

  return [allUsers, loading];
}

export default useGetAllUsers;
