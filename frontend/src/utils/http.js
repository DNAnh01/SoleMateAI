import axios from 'axios';
import { useEffect } from 'react';
import configs from '~/configs';

// Create an instance of axios outside the class
const instance = axios.create({
    baseURL: configs.baseUrl.url,
    timeout: 100000,
});

// Interceptor logic that will be used in a functional component
const useAxiosInterceptors = (accessToken, setAccessToken) => {
    useEffect(() => {
        const requestInterceptor = instance.interceptors.request.use(
            (config) => {
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

        const responseInterceptor = instance.interceptors.response.use(
            (response) => response,
            (error) => {
                // if (error.response?.status !== 200 && error.response?.status !== 201) {
                //     setAccessToken('');
                //     window.location.href = configs.roures.auth.signIn;
                // }
                // return Promise.reject(error);
            },
        );

        // Cleanup function to remove the interceptors
        return () => {
            instance.interceptors.request.eject(requestInterceptor);
            instance.interceptors.response.eject(responseInterceptor);
        };
    }, [accessToken, setAccessToken]);
};

const http = instance;
export { useAxiosInterceptors };
export default http;
