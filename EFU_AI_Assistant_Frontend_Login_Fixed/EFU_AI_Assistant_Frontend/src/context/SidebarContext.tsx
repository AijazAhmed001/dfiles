import {
    createContext,
    ReactNode,
    useCallback,
    useMemo,
    useState,
} from "react";

type SidebarContextValue = {
    isCollapsed: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextValue | undefined>(
    undefined,
);

type SidebarProviderProps = {
    children: ReactNode;
};

export function SidebarProvider({ children }: SidebarProviderProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = useCallback(() => {
        setIsCollapsed((currentValue) => !currentValue);
    }, []);

    const closeSidebar = useCallback(() => {
        setIsCollapsed(true);
    }, []);

    const value = useMemo(
        () => ({
            isCollapsed,
            toggleSidebar,
            closeSidebar,
        }),
        [isCollapsed, toggleSidebar, closeSidebar],
    );

    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    );
}
