import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { defaultTheme } from '~/styles/themes/default';
import Icons from '../common/Icons/Icons';
import Image from '../common/Image';
import images from '~/assets/images';

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

        span {
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
        background: ${defaultTheme.color_yellow_green};
        color: #fff;
        border-radius: 15px 15px 0 15px;
    }
    &.incoming p {
        background: #3a3a3a;
        color: #fff;
        border-radius: 15px 15px 15px 0;
    }

    p.error {
        color: #721c24;
        background: #f8d7da;
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
    const chatboxRef = useRef(null);

    const createChatItem = (message, className) => (
        <ChatItem className={className}>
            {className === 'incoming' && (
                <span>
                    <Image src={images.chatbot} alt="chatbot" width={32} height={32} />
                </span>
            )}
            <p>{message}</p>
            {className === 'outgoing' && (
                <span>
                    <Image src={images.defaultUserAvatar} alt="user" width={32} height={32} />
                </span>
            )}
        </ChatItem>
    );

    const handleChat = () => {
        if (!userMessage.trim()) return;

        const outgoingChatItem = createChatItem(userMessage.trim(), 'outgoing');
        setChatMessages((prev) => [...prev, outgoingChatItem]);
        setUserMessage('');

        setTimeout(() => {
            const incomingChatItem = (
                <ChatItem className="incoming">
                    <span>
                        <Image src={images.chatbot} alt="chatbot" width={32} height={32} />
                    </span>
                    <SkeletonLoading />
                </ChatItem>
            );
            setChatMessages((prev) => [...prev, incomingChatItem]);

            // Fake response after a delay
            setTimeout(() => {
                const responseChatItem = createChatItem('This is a response from the chatbot.', 'incoming');
                setChatMessages((prev) => {
                    const updatedMessages = [...prev];
                    updatedMessages[updatedMessages.indexOf(incomingChatItem)] = responseChatItem;
                    return updatedMessages;
                });
                chatboxRef.current.scrollTo(0, chatboxRef.current.scrollHeight);
            }, 1000);
        }, 600);
    };

    return (
        <>
            {!showChatbot && (
                <ChatbotIcon onClick={() => setShowChatbot(true)}>
                    <Image src={images.chatbot} alt="chatbot" width={70} height={70} className="chatbot-icon" />
                </ChatbotIcon>
            )}
            {showChatbot && (
                <ChatbotContainer>
                    <ChatbotHeader>
                        <Image src={images.chatbot} alt="chatbot" width={40} height={40} className="chatbot-icon" />
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
                        {chatMessages.map((chat, index) => (
                            <React.Fragment key={index}>{chat}</React.Fragment>
                        ))}
                    </Chatbox>
                    <ChatInputContainer>
                        <textarea
                            placeholder="Enter a message..."
                            spellCheck="false"
                            required
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 800) {
                                    e.preventDefault();
                                    handleChat();
                                }
                            }}
                        />
                        <span onClick={() => handleChat()}>
                            <Icons icon="sendMessage" width={24} height={24} color={defaultTheme.color_white} />
                        </span>
                    </ChatInputContainer>
                </ChatbotContainer>
            )}
        </>
    );
};

export default Chatbot;
