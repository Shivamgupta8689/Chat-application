// GetAllUser.js
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import API from '../utils/axiosInstance'

const GetAllUser = () => {
    const [allUsers, setAllUser] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(()=>{
        const getUser = async ()=>{
            setLoading(true);
            try {
                const token = Cookies.get("jwt")
                
                // 🔍 CRITICAL LOGS
                console.log("=== DEBUG START ===");
                console.log("1. Token exists?", token ? "YES ✅" : "NO ❌");
                console.log("2. Token value:", token);
                console.log("3. Backend URL:", import.meta.env.VITE_BACKEND_URL);
                console.log("4. All cookies:", document.cookie);
                console.log("===================");
                
                if (!token) {
                    alert("❌ No token found! Please login first.");
                    setLoading(false);
                    return;
                }
                
                const response = await API.get("/api/user/getUserProfile", {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                
                console.log("✅ Success:", response.data);
                setAllUser(response.data.filteredUser)
                setLoading(false)
            } catch (error) {
                console.log("❌ ERROR DETAILS:");
                console.log("Error:", error);
                console.log("Response:", error.response);
                console.log("Status:", error.response?.status);
                console.log("Data:", error.response?.data);
                setLoading(false)
            }
        }
        getUser()
    }, [])
    
    return [allUsers, loading]
}

export default GetAllUser
