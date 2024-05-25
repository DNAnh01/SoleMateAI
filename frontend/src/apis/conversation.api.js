import configs from '~/configs';
import http from '~/utils/http';

const conversationApi = {
    async createConversationWithAuth() {
        return await http.get(configs.baseUrl.conversation.createWithAuth);
    },
    async createConversationWithoutAuth() {
        return await http.get(configs.baseUrl.conversation.createWithoutAuth);
    },
};
export default conversationApi;
