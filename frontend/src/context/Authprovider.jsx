import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const getInitialUser = () => {
        try {
            const storedUser = localStorage.getItem("messenger");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Failed to parse user data:", error);
            localStorage.removeItem("messenger");
            return null;
        }
    };

    const [authUser, setAuthUser] = useState(getInitialUser());

    useEffect(() => {
        if (authUser) {
            localStorage.setItem("messenger", JSON.stringify(authUser));
        } else {
            localStorage.removeItem("messenger");
        }
    }, [authUser]);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
