import { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const logout = async () => {
        try {
            await axios.post(
                `${backendUrl}/api/auth/logout`,
                {},
                { withCredentials: true }
            );

            setUserData(null);
            setIsLoggedin(false);

            toast.success("Logged out successfully");

        } catch (err) {
            toast.error("Logout failed");
        }
    };

    const getUserData = async () => {
        try {
            const res = await axios.get(
                `${backendUrl}/api/user/data`,
                { withCredentials: true }
            );

            setUserData(res.data.user);
            setIsLoggedin(true);
        } catch (err) {
            setUserData(null);
            setIsLoggedin(false);

            // show error only if not auth-related
            if (err.response?.status !== 401) {
                const message =
                    err.response?.data?.message ||
                    err.message ||
                    "Something went wrong";

                toast.error(message);
            }
        } finally {
            setAuthLoading(false);
        }
    };

    //  Check auth ONCE on app load


    const value = {
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData,
        authLoading,
        logout,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

