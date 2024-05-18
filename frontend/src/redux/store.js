import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '~/redux/slices/sidebarSlice';

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
    },
});
