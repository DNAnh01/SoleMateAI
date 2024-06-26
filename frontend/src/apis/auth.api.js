import configs from '~/configs';
import http from '~/utils/http';

const authApi = {
    async signUp({ email, password }) {
        return await http.post(configs.baseUrl.auth.signUp, { email, password });
    },
    async signIn({ email, password }) {
        return await http.post(configs.baseUrl.auth.signIn, { email, password });
    },
    async forgotPassword({ email }) {
        return await http.post(configs.baseUrl.auth.forgotPassword, { email });
    },
    async changePassword({ passwordOld, passwordNew }) {
        return await http.post(configs.baseUrl.auth.changePassword, {
            password_old: passwordOld,
            password_new: passwordNew,
        });
    },
    async signOut() {
        return await http.get(configs.baseUrl.auth.signOut);
    },
};

export default authApi;
