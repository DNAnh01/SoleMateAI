import http from '~/utils/http';

export const ChatbotAPI = {
    getAll: () => http.get(`chatbot/get-all`),
    getChatbotDetails: (id) => http.get(`chatbot/id=${id}`),
    getKnowledgeChatbotDetails: (id) => http.get(`knowledge-base/chatbot-id=${id}/get-all`),
    createChatbot: (params) => http.post(`/chatbot/`, params),
    createKnowledgeChatbot: (id, params) => http.post(`/knowledge-base/chatbot-id=${id}`, params),
};
