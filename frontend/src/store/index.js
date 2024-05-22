import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

const useAppStore = createWithEqualityFn()(
    persist(
        (set) => ({
            isAuthenticated: false,
            profile: {},
            role: 'user',
            isSidebarOpen: false,
            products: [],
            accessToken: '',
            isLoadingAPI: false,
            isShowOverlay: false,
            setIsAuthenticated: (isAuthenticated) => {
                set((state) => {
                    return {
                        ...state,
                        isAuthenticated,
                    };
                });
            },
            setProfile: (profile) => {
                set((state) => {
                    return {
                        ...state,
                        profile,
                    };
                });
            },
            setRole: (role) => {
                set((state) => {
                    return {
                        ...state,
                        role,
                    };
                });
            },
            setIsSidebarOpen: (isSidebarOpen) => {
                set((state) => {
                    return {
                        ...state,
                        isSidebarOpen,
                    };
                });
            },
            setProducts: (products) => {
                set((state) => {
                    return {
                        ...state,
                        products,
                    };
                });
            },
            setAccessToken: (accessToken) => {
                set((state) => {
                    return {
                        ...state,
                        accessToken,
                    };
                });
            },
            setIsLoadingAPI: (isLoadingAPI) => {
                set((state) => {
                    return {
                        ...state,
                        isLoadingAPI,
                    };
                });
            },
            setIsShowOverlay: (isShowOverlay) => {
                set((state) => {
                    return {
                        ...state,
                        isShowOverlay,
                    };
                });
            },
            clearCurrentUser: () => {
                set((state) => {
                    return {
                        ...state,
                        profile: {},
                    };
                });
            },
        }),
        {
            name: 'user-storage',
        },
    ),
    shallow,
);

export { useAppStore as default };
