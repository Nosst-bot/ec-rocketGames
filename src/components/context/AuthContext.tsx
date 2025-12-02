import { createContext, useState, type ReactNode } from "react";

interface AuthContextType {
    token: string | null;
    role: string | null;
    login: (jwt: string, r: string) => void;
    logout: () => void;
    isLogged: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    role: null,
    login: () => {},
    logout: () => {},
    isLogged: false
});


export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

    const login = (jwt: string, r: string) => {
        localStorage.setItem("token", jwt);
        localStorage.setItem("role", r);
        setToken(jwt);
        setRole(r);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ token, role, login, logout, isLogged: !!token }}>
            {children}
        </AuthContext.Provider>
    );
}
