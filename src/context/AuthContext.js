import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext(undefined);
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Mock authentication check
        const checkAuth = () => {
            const mockUser = {
                id: "123",
                email: "admin@example.com",
                role: "admin",
                permissions: ["admin/*"],
            };
            setUser(mockUser);
            setIsLoading(false);
        };
        checkAuth();
    }, []);
    const signIn = async (email, password) => {
        // Mock implementation
        setUser({
            id: "123",
            email: email,
            role: "admin",
            permissions: ["admin/*"],
        });
    };
    const signOut = async () => {
        // Mock implementation
        setUser(null);
    };
    if (isLoading) {
        return _jsx("div", { "aria-label": "Loading authentication", children: "Loading..." });
    }
    return (_jsx(AuthContext.Provider, { value: {
            user,
            signIn,
            signOut,
            isAuthenticated: !!user,
            hasPermission: (permission) => {
                return user?.permissions?.includes(permission) || false;
            },
        }, children: children }));
}
