import { useEffect, useMemo, useState } from 'react';

import { columnsChatbot } from '~/data/data.chatbot';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline, MdOutlinePublic, MdOutlinePublicOff } from 'react-icons/md';
import { Modal, Popconfirm, Table, Input } from 'antd';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ChatbotAPI from '~/apis/chatbot.api';
import { defaultTheme } from '~/styles/themes/default';
import Loading from '~/components/loading/loading';

const ChatbotAdmin = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [chatbotList, setChatbotList] = useState([]);
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);

    const [chatbotName, setChatbotName] = useState('');
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    console.log('chatbotList', chatbotList);

    const handleClickCreate = () => {
        setIsOpenModalEdit(true);
    };

    const handleCancel = () => {
        setIsOpenModalEdit(false);
    };

    const handleChangeChatbotName = (e) => {
        setChatbotName(e.target.value);
    };

    const handlePublicChatbot = async (id) => {
        try {
            setIsLoading(true);
            const res = await ChatbotAPI.publicChatbot(id);
            if (res.status === 200) {
                fetchDataChatbot();
                console.log('chatbot was public', res.data);
                toast.success('Công khai chatbot thành công.');
            } else {
                toast.error('Công khai chatbot thất bại. Vui lòng thử lại sau.');
            }
        } catch (_) {
            toast.error('Công khai chatbot thất bại. Vui lòng thử lại sau.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteChatbot = async (id) => {
        try {
            setIsLoading(true);
            const res = await ChatbotAPI.deleteChatbot(id);
            if (res.status === 200) {
                fetchDataChatbot();
                toast.success('Xoá chatbot thành công.');
            } else {
                toast.error('Xoá chatbot thất bại. Vui lòng thử lại sau.');
            }
        } catch (_) {
            toast.error('Xoá chatbot thất bại. Vui lòng thử lại sau.');
        } finally {
            setIsLoading(false);
        }
    };

    const convertColumns = useMemo(() => {
        return [
            ...columnsChatbot,
            {
                title: 'Công khai',
                dataIndex: 'is_public',
                key: 'is_public',
                render: (text, record, index) => {
                    return (
                        <div className="flex items-center justify-center z-50">
                            {record.is_public ? (
                                <MdOutlinePublic
                                    fontSize={28}
                                    style={{ color: `${defaultTheme.color_yellow_green}` }}
                                />
                            ) : (
                                <MdOutlinePublicOff
                                    style={{ color: `${defaultTheme.color_red}` }}
                                    fontSize={28}
                                    onClick={() => handlePublicChatbot(record.id)}
                                ></MdOutlinePublicOff>
                            )}
                        </div>
                    );
                },
            },
            {
                title: 'Hành động',
                dataIndex: '',
                key: 'action',
                render: (text, record, index) => {
                    return (
                        <div className="flex items-center gap-1 z-50">
                            {record.model === 'gpt-4' && (
                                <button
                                    onClick={() => navigate(`/admin/chatbot/${record.id}`)}
                                    className="p-1 rounded hover:bg-slate-400 hover:text-white"
                                >
                                    <FaRegEdit fontSize={18} />
                                </button>
                            )}
                            {record.model === 'gpt-4' && (
                                <Popconfirm
                                    title="Xoá chatbot?"
                                    description="Bạn chắc chắn muốn xoá chatbot này?"
                                    okText="Chấp nhận"
                                    cancelText="Huỷ"
                                    placement="bottomRight"
                                    onConfirm={() => handleDeleteChatbot(record.id)}
                                >
                                    <button className="p-1 rounded text-red-600 hover:bg-red-600 hover:text-white">
                                        <MdDeleteOutline fontSize={18} />
                                    </button>
                                </Popconfirm>
                            )}
                        </div>
                    );
                },
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    const fetchDataChatbot = async () => {
        try {
            setIsLoading(true);
            const res = await ChatbotAPI.getAll();
            if (res.status === 200) {
                setChatbotList(res.data);
            } else {
                toast.error('Lấy dữ liệu thất bại. Vui lòng thử lại sau.', {
                    autoClose: 3000,
                });
            }
        } catch (_) {
            toast.error('Lấy dữ liệu thất bại. Vui lòng thử lại sau.', {
                autoClose: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateNewChatBot = async () => {
        try {
            setIsLoadingForm(true);
            if (chatbotName) {
                const res = await ChatbotAPI.createChatbot({
                    chatbot_name: chatbotName,
                });
                if (res.status === 201) {
                    fetchDataChatbot();
                    toast.success('Tạo Chatbot thành công.', {
                        autoClose: 3000,
                    });
                } else {
                    toast.error('Tạo Chatbot thất bại. Vui lòng thử lại sau.', {
                        autoClose: 3000,
                    });
                }
                setIsLoadingForm(false);
            }
        } catch (err) {
            setIsLoadingForm(false);
            toast.error(err, {
                autoClose: 3000,
            });
        } finally {
            setIsOpenModalEdit(false);
            setIsLoadingForm(false);
        }
    };

    useEffect(() => {
        fetchDataChatbot();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="p-4">
                <div className="flex justify-end items-center pb-6">
                    <button
                        onClick={handleClickCreate}
                        className="py-2 px-3 bg-green-400 font-semibold text-white rounded-md hover:bg-green-600"
                    >
                        Tạo mới chatbot
                    </button>
                </div>

                <Table dataSource={chatbotList} columns={convertColumns} className="w-full" />
            </div>
            <Modal
                title={'Tạo mới Chatbot'}
                open={isOpenModalEdit}
                cancelText="Hủy"
                onOk={handleCreateNewChatBot}
                confirmLoading={isLoadingForm}
                onCancel={handleCancel}
                className="min-w-[100px]"
            >
                <div className="flex flex-col gap-4 overflow-y-auto min-h-[80px] py-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="chatbotName">Tên Chatbot:</label>
                        <Input placeholder="Tên chatbot" value={chatbotName} onChange={handleChangeChatbotName} />
                    </div>
                </div>
            </Modal>
            <Loading isLoading={isLoading} />
        </>
    );
};
export default ChatbotAdmin;
