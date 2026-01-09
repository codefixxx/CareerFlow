import { createContext, useState} from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);
    const getUserData = async () => {
        try {
            const res = await axios.get(
                `${backendUrl}/api/user/data`,
                { withCredentials: true }
            );

            setUserData(res.data.user);
            

        } catch (err) {
            if (err.response?.status === 401) {
                // not logged in
                setUserData(null);
                return;
            }

            const message =
                err.response?.data?.message ||
                err.message ||
                "Something went wrong";

            toast.error(message);
        }
    };

    const value = {
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData,
    };

    return (<AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
    )
}

