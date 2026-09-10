import { createContext, useState, useEffect } from "react";
import { getEmailFromStorage, getTokenFromStorage, removeTokenFromStorage } from "../services/storageService";
import { validateToken } from "../services/authService";

const initialAuth = {
    token: getTokenFromStorage() || null,
    email: getEmailFromStorage() || null,
    isAuthenticated: false,
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [ auth, setAuth ] = useState(initialAuth);

    const checkAuthStatus = async () => {
        if (auth.token && auth.email) {
            try {
                await validateToken({ token: auth.token, email: auth.email });
                setAuth({
                    token: auth.token,
                    email: auth.email,
                    isAuthenticated: true,
                });
            } catch (error) {
                removeTokenFromStorage();
                setAuth(initialAuth);
            }
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
};