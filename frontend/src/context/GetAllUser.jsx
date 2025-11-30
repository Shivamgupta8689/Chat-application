import React, { useEffect, useState } from 'react';
import API from '../utils/axiosInstance';
import { useAuth } from './Authprovider';

const GetAllUser = () => {
    const [allUsers, setAllUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuth();
    
    useEffect(() => {
        // Only fetch if user is authenticated
        if (!authUser?.user?._id) {
            return;
        }

        const getUser = async (retryCount = 0) => {
            setLoading(true);
            try {
                const response = await API.get("/api/user/getUserProfile");
                
                if (response.data && response.data.filteredUser) {
                    setAllUser(response.data.filteredUser);
                }
            } catch (error) {
                // More detailed error logging
                if (error.response) {
                    console.error("Error in GetAllUser - Status:", error.response.status);
                    console.error("Error in GetAllUser - Data:", error.response.data);
                    
                    // Handle 401 Unauthorized
                    if (error.response.status === 401) {
                        const storedAuth = localStorage.getItem("messenger");
                        
                        // If no stored auth, user needs to login
                        if (!storedAuth) {
                            setAuthUser(null);
                            setTimeout(() => {
                                window.location.href = '/login';
                            }, 500);
                            return;
                        }
                        
                        // Cookie issue - retry once after a delay
                        if (retryCount === 0) {
                            console.warn("401 error - retrying after delay (possible cookie sync issue)");
                            setTimeout(() => {
                                getUser(1);
                            }, 1000);
                            return;
                        }
                        
                        // After retry, if still 401, clear auth and redirect
                        console.error("401 error persists after retry. Clearing auth and redirecting to login.");
                        localStorage.removeItem("messenger");
                        setAuthUser(null);
                        setTimeout(() => {
                            window.location.href = '/login';
                        }, 500);
                    }
                } else if (error.request) {
                    // Request was made but no response received
                    console.error("Error in GetAllUser - No response:", error.message);
                } else {
                    // Something else happened
                    console.error("Error in GetAllUser:", error.message);
                }
            } finally {
                setLoading(false);
            }
        };
        
        // Delay to ensure cookie is properly set after login
        // Increased delay for production cross-origin scenarios
        const timer = setTimeout(() => {
            getUser();
        }, 500);
        
        return () => clearTimeout(timer);
    }, [authUser?.user?._id, setAuthUser]);
    
    return [allUsers, loading];
};

export default GetAllUser;
