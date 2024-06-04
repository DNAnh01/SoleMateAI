import http from '~/utils/http';

const ChatbotAPI = {
    getAll: () => http.get(`chatbot/get-all`),
    getChatbotDetails: (id) => http.get(`chatbot/id=${id}`),
    getKnowledgeChatbotDetails: (id) => http.get(`knowledge-base/chatbot-id=${id}/get-all`),
    createChatbot: (params) => http.post(`/chatbot/`, params),
    // updateChatbot: (id, params) => http.put(`/chatbot/id=${id}`, params),
    publicChatbot: (id) => http.patch(`/chatbot/id=${id}`, { is_public: true }),
    deleteChatbot: (id) => http.delete(`/chatbot/id=${id}`),
    createKnowledgeChatbot: (id, params) => http.post(`/knowledge-base/chatbot-id=${id}`, params),
};

export default ChatbotAPI;
