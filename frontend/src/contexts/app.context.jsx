import { createContext, useState } from 'react';
import { getProfileFromLocalStorage } from '~/utils/auth';

export const getInitialAppContext = () => ({
    isAuthenticated: false,
    setIsAuthenticated: () => null,
    profile: getProfileFromLocalStorage(),
    setProfile: () => null,
    role: getProfileFromLocalStorage()?.role || 'user',
    setRole: () => null,
    isSidebarOpen: false,
    toggleSidebar: () => null,
    reset: () => null,
    products: [],
    setProducts: () => null,
});

const initialAppContext = getInitialAppContext();

export const AppContext = createContext(initialAppContext);

export const AppProvider = ({ children, defaultValue = initialAppContext }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(defaultValue.isAuthenticated);
    const [profile, setProfile] = useState(defaultValue.profile);
    const [role, setRole] = useState(defaultValue.role);
    const [isSidebarOpen, setIsSidebarOpen] = useState(defaultValue.isSidebarOpen);
    const [products, setProducts] = useState([]);
    const reset = () => {
        setIsAuthenticated(false);
        setProfile(null);
        setRole('user');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                profile,
                setProfile,
                role,
                setRole,
                reset,
                isSidebarOpen,
                toggleSidebar,
                products,
                setProducts,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
