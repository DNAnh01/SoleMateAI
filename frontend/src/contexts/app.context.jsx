import { createContext, useState } from 'react';
import { getProfileFromLocalStorage } from '~/utils/auth';

/**
 * 
 * @returns 
 * {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOTdiYzhiODUtMzM4NC00MGZkLWI1MWEtNjkyZjRlYWJjMWRiIiwiZXhwIjoxNzE2MTU1NDkyfQ.JxsnomFmpMTg_VRQ_q2ISR6ZV_xhhY7qENRqhe7tPFk",
    "token_type": "bearer",
    "user": {
        "is_active": true,
        "created_at": "2024-05-20T03:46:03.930451+07:00",
        "updated_at": "2024-05-20T03:46:03.930451+07:00",
        "deleted_at": null,
        "id": "97bc8b85-3384-40fd-b51a-692f4eabc1db",
        "role_name": "user",
        "email": "donguyenanhgithub@gmail.com",
        "display_name": "donguyenanhgithub-zFWX2",
        "avatar_url": "https://raw.githubusercontent.com/DNAnh01/assets/main/SoleMateAI/default_user_avatar.png",
        "payment_information": "",
        "is_verified": false
    }
}
 */
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
});

const initialAppContext = getInitialAppContext();

export const AppContext = createContext(initialAppContext);

export const AppProvider = ({ children, defaultValue = initialAppContext }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(defaultValue.isAuthenticated);
    const [profile, setProfile] = useState(defaultValue.profile);
    const [role, setRole] = useState(defaultValue.role);
    const [isSidebarOpen, setIsSidebarOpen] = useState(defaultValue.isSidebarOpen);

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
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
