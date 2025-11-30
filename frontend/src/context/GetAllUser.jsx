import { useEffect, useState } from 'react';
import API from '../utils/axiosInstance';
import { useAuth } from './Authprovider';

export const useGetAllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuth();

    useEffect(() => {
        if (!authUser?._id) return;

        const getUser = async (retryCount = 0) => {
            setLoading(true);
            try {
                const response = await API.get("/api/user/getUserProfile");
                
                if (response.data?.filteredUser) {
                    setAllUsers(response.data.filteredUser);
                }

            } catch (error) {
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
                }

            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => getUser(), 500);
        return () => clearTimeout(timer);

    }, [authUser?._id, setAuthUser]);

    return [allUsers, loading];
};
