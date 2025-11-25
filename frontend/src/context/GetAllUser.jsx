import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import axios from 'axios'
import API from '../utils/axiosInstance'

const GetAllUser = () => {
    const [allUsers, setAllUser] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const getUser = async () => {
        setLoading(true);
        try {
          const response = await API.get("/api/user/getUserProfile");
          setAllUser(response.data.filteredUser);
        } catch (error) {
          console.log("Error in GetAllUser: ", error.response?.data || error.message);
        } finally {
          setLoading(false);
        }
      };
      getUser();
    }, []);
  
    return [allUsers, loading];
  };
  

export default GetAllUser
