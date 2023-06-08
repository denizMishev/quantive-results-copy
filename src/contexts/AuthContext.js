import { createContext } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext();

export function AuthProvider({
    children,
}) {
    const [auth, setAuth] = useLocalStorage('auth', {});

    const userLogin = (authData) => {
        setAuth(authData);
    };

    const userLogout = () => {
        setAuth({});
    };

    return (
        <AuthContext.Provider value={{
            user: auth,
            userLogin,
            userLogout
        }}>
            {children}
        </AuthContext.Provider>
    );
};