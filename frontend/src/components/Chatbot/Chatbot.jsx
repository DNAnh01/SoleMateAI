import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { defaultTheme } from '~/styles/themes/default';
import Icons from '../common/Icons/Icons';
import Image from '../common/Image';
import images from '~/assets/images';
import messageApi from '~/apis/message.api';
import useAppStore from '~/store';
import conversationApi from '~/apis/conversation.api';
import { Link } from 'react-router-dom';
import productApi from '~/apis/product.api';
import configs from '~/configs';
import { extractProductId } from '~/utils/helper';

const shakeAnimation = keyframes`
    0% { transform: rotate(0deg); }
    25% { transform: rotate(-25deg); }
    50% { transform: rotate(25deg); }
    75% { transform: rotate(-25deg); }
    100% { transform: rotate(0deg); }
`;

const ChatbotIcon = styled.div`
    position: fixed;
    z-index: 1000;
    right: 60px;
    bottom: 60px;
    width: 70px;
    height: 70px;
    background: ${defaultTheme.color_yellow_green};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 2rem;
    cursor: pointer;
    box-shadow: 0 0 128px 0 rgba(0, 0, 0, 0.1), 0 32px 64px -48px rgba(0, 0, 0, 0.5);
    animation: ${shakeAnimation} 1s infinite;

    .chatbot-icon {
        width: 70px;
        height: 70px;
        padding: 10px;
        background-color: ${defaultTheme.color_yellow_green};
        border-radius: 50%;
    }
`;

const ChatbotContainer = styled.div`
    position: fixed;
    z-index: 1000;
    right: 60px;
    bottom: 60px;
    width: 420px;
    background: ${defaultTheme.color_black_04};
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 0 128px 0 rgba(0, 0, 0, 0.1), 0 32px 64px -48px rgba(0, 0, 0, 0.5);
    @media (max-width: 490px) {
        right: 0;
        bottom: 0;
        height: 100%;
        border-radius: 0;
        width: 100%;
    }
`;

const ChatbotHeader = styled.header`
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    background: ${defaultTheme.color_yellow_green};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    h4 {
        margin: 0;
        font-size: 1.4rem;
    }

    .chatbot-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
`;

const Chatbox = styled.ul`
    overflow-y: auto;
    height: 510px;
    padding: 30px 20px 100px;
    background: ${defaultTheme.color_outerspace};
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;

    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${defaultTheme.color_black_04};
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: ${defaultTheme.color_silver};
    }
`;

const ChatItem = styled.li`
    display: flex;
    align-items: flex-end;
    list-style: none;
    margin: 20px 0;

    &.outgoing {
        justify-content: flex-end;

        .timestamp {
            order: 0;
            margin-right: 10px;
        }

        p {
            order: 1;
            border-radius: 15px 15px 0 15px;
        }

        span {
            order: 2;
            width: 32px;
            height: 32px;
            color: #fff;
            cursor: default;
            text-align: center;
            line-height: 32px;
            background: ${defaultTheme.color_yellow_green};
            border-radius: 50%;
            margin-left: 10px;

            img {
                width: 32px;
                height: 32px;
                border-radius: 50%;
            }
        }
    }

    &.incoming {
        justify-content: flex-start;

        span {
            order: 0;
            width: 32px;
            height: 32px;
            color: #fff;
            cursor: default;
            text-align: center;
            line-height: 32px;
            background: ${defaultTheme.color_yellow_green};
            border-radius: 50%;
            margin-right: 10px;

            img {
                width: 32px;
                height: 32px;
                border-radius: 50%;
            }
        }

        p {
            order: 1;
            border-radius: 15px 15px 15px 0;
        }

        .timestamp {
            order: 2;
            margin-left: 10px;
        }
    }

    p {
        white-space: pre-wrap;
        padding: 12px 16px;
        border-radius: 10px;
        max-width: 75%;
        font-size: 0.95rem;
        overflow-wrap: break-word;
        word-break: break-word;
        margin: 0;
    }

    &.outgoing p {
        background: ${defaultTheme.color_dark_slate_blue};
        color: #fff;
    }
    &.incoming p {
        background: #3a3a3a;
        color: #fff;
    }

    p.error {
        color: #721c24;
        background: #f8d7da;
    }

    .timestamp {
        font-size: 0.75rem;
        color: #ccc;
        margin-top: 5px;
    }

    .product-image {
        margin-top: 10px;
        width: 90%;
        height: auto;
        &:hover {
            cursor: pointer;
            transform: scale(1.05);
            filter: brightness(1.2);
        }
    }
`;

const ChatInputContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #2b2b2b;
    padding: 10px 20px;
    border-top: 1px solid #444;

    @media (max-width: 490px) {
        padding: 10px 15px;
    }

    textarea {
        flex: 1;
        height: 45px;
        border: none;
        outline: none;
        resize: none;
        max-height: 180px;
        padding: 10px;
        font-size: 1rem;
        background: ${defaultTheme.color_outerspace};
        color: #fff;
        border-radius: 5px;

        ::placeholder {
            color: #ccc;
        }
    }

    span {
        align-self: center;
        color: ${defaultTheme.color_yellow_green};
        cursor: pointer;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        background: ${defaultTheme.color_outerspace};
        padding: 0 10px;
        border-radius: 5px;

        svg {
            width: 24px;
            height: 24px;
        }
    }
`;

const loadingAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  50% {
        background-position: calc(200px + 100%) 0;
    }   
  100% {
        background-position: calc(200px + 100%) 0;
    }
`;

const SkeletonLoading = styled.div`
    display: inline-block;
    height: 50px;
    width: 275px;
    background: linear-gradient(
        90deg,
        ${defaultTheme.color_yellow_green},
        ${defaultTheme.color_purple},
        ${defaultTheme.color_yellow_green},
        ${defaultTheme.color_purple}
    );
    background-size: 200% 200%;
    animation: ${loadingAnimation} 2s linear infinite;
    border-radius: 10px;
`;

const Chatbot = () => {
    const [showChatbot, setShowChatbot] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const chatboxRef = useRef(null);
    const { isAuthenticated, profile, conversationId, setConversationId } = useAppStore();

    useEffect(() => {
        const fetchConversation = async () => {
            let resConversation;
            if (isAuthenticated) {
                resConversation = await conversationApi.createConversationWithAuth();
            } else {
                resConversation = await conversationApi.createConversationWithoutAuth();
            }
            const conversationId = resConversation.data.id;
            setConversationId(conversationId);

            const resMessages = await messageApi.getMessageByConversationId(conversationId);
            let messages =
                resMessages.data.length > 0
                    ? resMessages.data
                    : [
                          {
                              id: 1,
                              sender_type: 'bot',
                              message_text: 'Xin chào, tôi có thể giúp gì cho bạn?',
                              created_at: new Date().toISOString(),
                          },
                      ];

            messages = await Promise.all(
                messages.map(async (message) => {
                    if (message.message_text.includes('http')) {
                        // [{frontend_url}/product/_shoe_id]

                        const productId = extractProductId(message);
                        try {
                            const responseProduct = await productApi.getById(productId);
                            message.image_url = responseProduct.data.image_url;
                        } catch (error) {
                            console.error('Failed to fetch product image:', error);
                            message.image_url = images.noImage;
                        }
                    }
                    return message;
                }),
            );

            // Sort messages by created_at
            messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

            setChatMessages(messages);
        };

        if (showChatbot) {
            fetchConversation();
        }
    }, [showChatbot, isAuthenticated, setConversationId]);

    useEffect(() => {
        if (showChatbot && chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [showChatbot, chatMessages]);

    const handleChat = async () => {
        if (!userMessage.trim()) return;

        const newMessage = {
            id: chatMessages.length + 1,
            sender_type: 'guest',
            message_text: userMessage,
            created_at: new Date().toISOString(),
        };
        const newChatMessages = [...chatMessages, newMessage];
        setChatMessages(newChatMessages);
        setUserMessage('');
        setLoading(true);

        try {
            let response;
            if (isAuthenticated) {
                response = await messageApi.createMessageWithAuth({
                    message: userMessage,
                    conversation_id: conversationId,
                });
            } else {
                response = await messageApi.createMessageWithoutAuth({
                    message: userMessage,
                    conversation_id: conversationId,
                });
            }

            const botMessage = {
                id: response.data.id,
                sender_type: 'bot',
                message_text: response.data.message_text,
                created_at: response.data.created_at,
            };

            if (response.data.message_text.includes('http')) {
                const productId = extractProductId(response.data);
                try {
                    const responseProduct = await productApi.getById(productId);
                    botMessage.image_url = responseProduct.data.image_url;
                } catch (error) {
                    console.error('Failed to fetch product image:', error);
                    botMessage.image_url = images.noImage;
                }
            }

            setChatMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            setChatMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: prevMessages.length + 1,
                    sender_type: 'bot',
                    message_text: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.',
                    created_at: new Date().toISOString(),
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleEnterPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleChat();
        }
    };

    const createChatItem = (message) => (
        <ChatItem key={message.id} className={message.sender_type === 'guest' ? 'outgoing' : 'incoming'}>
            {message.sender_type === 'bot' && (
                <span>
                    <Image className="chatbot-icon" src={images.chatbot} alt="Bot" width={30} height={30} />
                </span>
            )}
            {message.message_text.includes('http') ? (
                <p>
                    {message.message_text.split('http')[0].split('[')[0]}
                    <br />
                    <Link to={`${configs.roures.productList}/${extractProductId(message)}`}>
                        <Image className="product-image" src={message.image_url || images.noImage} alt="Product" />
                    </Link>
                </p>
            ) : (
                <p>{message.message_text}</p>
            )}
            <div className="timestamp">{new Date(message.created_at).toLocaleTimeString()}</div>
            {message.sender_type === 'guest' && (
                <span>
                    {isAuthenticated ? (
                        <Image className="" src={profile.avatar_url} alt="User Avatar" />
                    ) : (
                        <Image className="" src={images.defaultUserAvatar} alt="User Avatar" />
                    )}
                </span>
            )}
        </ChatItem>
    );

    return (
        <>
            {showChatbot ? (
                <ChatbotContainer>
                    <ChatbotHeader>
                        <Image className="chatbot-icon" src={images.chatbot} alt="Chatbot" width={40} height={40} />
                        <h4>Chatbot</h4>
                        <Icons
                            icon="close"
                            width={20}
                            height={20}
                            color={defaultTheme.color_white}
                            onClick={() => setShowChatbot(false)}
                        />
                    </ChatbotHeader>
                    <Chatbox ref={chatboxRef}>
                        {chatMessages.length > 0 ? (
                            chatMessages.map((msg) => createChatItem(msg))
                        ) : (
                            <ChatItem className="incoming">
                                <span>
                                    <Image
                                        className="chatbot-icon"
                                        src={images.chatbot}
                                        alt="Bot"
                                        width={30}
                                        height={30}
                                    />
                                </span>
                                <SkeletonLoading />
                            </ChatItem>
                        )}
                        {loading && (
                            <ChatItem className="incoming">
                                <span>
                                    <Image
                                        className="chatbot-icon"
                                        src={images.chatbot}
                                        alt="Bot"
                                        width={30}
                                        height={30}
                                    />
                                </span>
                                <SkeletonLoading />
                            </ChatItem>
                        )}
                    </Chatbox>
                    <ChatInputContainer>
                        <textarea
                            rows={1}
                            value={userMessage}
                            placeholder="Nhập tin nhắn của bạn..."
                            onChange={(e) => setUserMessage(e.target.value)}
                            onKeyDown={handleEnterPress}
                        />
                        <span onClick={handleChat}>
                            <Icons icon="sendMessage" width={24} height={24} color={defaultTheme.color_white} />
                        </span>
                    </ChatInputContainer>
                </ChatbotContainer>
            ) : (
                <ChatbotIcon onClick={() => setShowChatbot(true)}>
                    <Image className="chatbot-icon" src={images.chatbot} alt="Chatbot" width={70} height={70} />
                </ChatbotIcon>
            )}
        </>
    );
};

export default Chatbot;
