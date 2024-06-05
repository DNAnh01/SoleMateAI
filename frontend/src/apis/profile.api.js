import configs from '~/configs';
import http from '~/utils/http';

const profileApi = {
    updateProfile: async ({ displayName, email, phoneNumber }) =>
        await http.patch(configs.baseUrl.user.updateProfile, {
            display_name: displayName,
            email: email,
            phone_number: phoneNumber,
        }),
};

export default profileApi;
