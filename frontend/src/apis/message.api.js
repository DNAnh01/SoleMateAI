import configs from '~/configs';
import http from '~/utils/http';

const messageApi = {
    async createMessageWithAuth({ message, conversation_id }) {
        return await http.post(configs.baseUrl.message.createWithAuth, { message, conversation_id });
    },
    async createMessageWithoutAuth({ message, conversation_id }) {
        return await http.post(configs.baseUrl.message.createWithoutAuth, { message, conversation_id });
    },
    async getMessageByConversationId(conversation_id) {
        return await http.get(`${configs.baseUrl.message.getByConversationId}${conversation_id}`);
    },
};

export default messageApi;
