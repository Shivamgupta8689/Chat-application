import { useEffect, useState } from 'react';
import API from '../utils/axiosInstance';
import { useAuth } from './Authprovider';

const GetAllUser = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuth();

    useEffect(() => {
        // Fix: Check authUser.user._id instead of authUser._id
        if (!authUser?.user?._id) {
            return;
        }

        const getUser = async (retryCount = 0) => {
            setLoading(true);
            try {
                const response = await API.get("/api/user/getUserProfile");
                
                if (response.data?.filteredUser) {
                    setAllUsers(response.data.filteredUser);
                } else {
                    console.warn("No filteredUser in response:", response.data);
                }

            } catch (error) {
                console.error("Error fetching users:", error);
                
                if (error.response?.status === 401) {
                    const stored = localStorage.getItem("messenger");

                    if (!stored) {
                        setAuthUser(null);
                        window.location.href = "/login";
                        return;
                    }

                    if (retryCount === 0) {
                        setTimeout(() => getUser(1), 1000);
                        return;
                    }

                    localStorage.removeItem("messenger");
                    setAuthUser(null);
                    window.location.href = "/login";
                } else {
                    // Log other errors for debugging
                    console.error("Failed to fetch users:", error.response?.data || error.message);
                }

            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => getUser(), 500);
        return () => clearTimeout(timer);

    }, [authUser?.user?._id, setAuthUser]);

    return [allUsers, loading];
};

export default GetAllUser;
