import axios from 'axios';
import configs from '~/configs';
import { getAccessTokenFromLocalStorage, clearLocalStorage } from '~/utils/auth';

class Http {
    instance;
    constructor() {
        this.instance = axios.create({
            baseURL: configs.baseUrl.url,
            timeout: 10000,
        });

        this.instance.interceptors.request.use(
            (config) => {
                const accessToken = getAccessTokenFromLocalStorage();
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            },
        );

        this.instance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.response?.status !== 200 && error.response?.status !== 201) {
                    clearLocalStorage();
                    window.location.href = configs.routes.auth.signIn;
                }
                return Promise.reject(error);
            },
        );
    }
}
const http = new Http().instance;
export default http;