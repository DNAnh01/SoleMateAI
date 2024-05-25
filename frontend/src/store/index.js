import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

const useAppStore = createWithEqualityFn(
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
            setIsAuthenticated: (isAuthenticated) => set((state) => ({ ...state, isAuthenticated })),
            setProfile: (profile) => set((state) => ({ ...state, profile })),
            setRole: (role) => set((state) => ({ ...state, role })),
            setIsSidebarOpen: (isSidebarOpen) => set((state) => ({ ...state, isSidebarOpen })),
            setProducts: (products) => set((state) => ({ ...state, products })),
            setAccessToken: (accessToken) => set((state) => ({ ...state, accessToken })),
            setIsLoadingAPI: (isLoadingAPI) => set((state) => ({ ...state, isLoadingAPI })),
            setIsShowOverlay: (isShowOverlay) => set((state) => ({ ...state, isShowOverlay })),
            clearCurrentUser: () => set((state) => ({ ...state, profile: {} })),
            clearLocalStorage: () =>
                set(() => ({
                    isAuthenticated: false,
                    profile: {},
                    role: 'user',
                    isSidebarOpen: false,
                    products: [],
                    accessToken: '',
                    isLoadingAPI: false,
                    isShowOverlay: false,
                }))
        }),
        { name: 'user-storage' },
    ),
    shallow,
);

export default useAppStore;
