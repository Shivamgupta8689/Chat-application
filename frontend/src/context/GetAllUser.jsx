import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import axios from 'axios'
import API from '../utils/axiosInstance'

const GetAllUser = () => {
    const [allUsers, setAllUser] = useState([])
    const [loading, setLoading] = useState([])
    useEffect(()=>{
        // GetAllUser.js me add karo
const getUser = async ()=>{
    setLoading(true);
    try {
        const token = Cookies.get("jwt")
        
        console.log("🔑 Token found:", token); // CHECK THIS
        console.log("📍 Backend URL:", import.meta.env.VITE_BACKEND_URL); // CHECK THIS
        
        if (!token) {
            console.log("❌ No token - Please login first");
            setLoading(false);
            return;
        }
        
        const response = await API.get("/api/user/getUserProfile", {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        
        console.log("✅ Response:", response.data);
        setAllUser(response.data.filteredUser)
        setLoading(false)
    } catch (error) {
        console.log("❌ Error in GetAllUser:", error)
        console.log("❌ Error response:", error.response?.data)
        setLoading(false)
    }
}
        getUser()
    }, [])
    return [allUsers , loading]
}

export default GetAllUser
