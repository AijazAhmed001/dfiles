import {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    LoginCredentials,
    loginUser,
} from "../services/authService";
import { User } from "../types/User";
import {
    getStoredUser,
    removeStoredUser,
    saveStoredUser,
} from "../utils/storage";

type AuthContextValue = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
    undefined,
);

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = getStoredUser();

        if (storedUser) {
            setUser(JSON.parse(storedUser) as User);
        }

        setIsLoading(false);
    }, []);

    const login = useCallback(async (credentials: LoginCredentials) => {
        const authenticatedUser = await loginUser(credentials);

        setUser(authenticatedUser);
        saveStoredUser(JSON.stringify(authenticatedUser));
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        removeStoredUser();
    }, []);

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: Boolean(user),
            isLoading,
            login,
            logout,
        }),
        [user, isLoading, login, logout],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
