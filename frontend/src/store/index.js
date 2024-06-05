import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

const useAppStore = createWithEqualityFn(
    persist(
        (set) => ({
            isAuthenticated: false,
            profile: {},
            role: '',
            isSidebarOpen: false,
            accessToken: '',
            isLoadingAPI: false,
            isShowOverlay: false,
            brands: [],
            conversationId: '',
            setIsAuthenticated: (isAuthenticated) => set((state) => ({ ...state, isAuthenticated })),
            setProfile: (profile) => set((state) => ({ ...state, profile })),
            setRole: (role) => set((state) => ({ ...state, role })),
            setIsSidebarOpen: (isSidebarOpen) => set((state) => ({ ...state, isSidebarOpen })),
            setAccessToken: (accessToken) => set((state) => ({ ...state, accessToken })),
            setIsLoadingAPI: (isLoadingAPI) => set((state) => ({ ...state, isLoadingAPI })),
            setIsShowOverlay: (isShowOverlay) => set((state) => ({ ...state, isShowOverlay })),
            setBrands: (brands) => set((state) => ({ ...state, brands })),
            setConversationId: (conversationId) => set((state) => ({ ...state, conversationId })),
            clearCurrentUser: () => set((state) => ({ ...state, profile: {} })),
            clearLocalStorage: () =>
                set(() => ({
                    isAuthenticated: false,
                    profile: {},
                    role: '',
                    isSidebarOpen: false,
                    accessToken: '',
                    isLoadingAPI: false,
                    isShowOverlay: false,
                    conversationId: '',
                })),
        }),
        { name: 'user-storage' },
    ),
    shallow,
);

export default useAppStore;
