import { useEffect, useMemo, useState } from 'react';
import { ChatbotAPI } from '~/apis/chatbot.api';
import { columnsChatbot } from '~/data/data.chatbot';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { Modal, Popconfirm, Table, Input } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAppStore from '~/store';

const ChatbotAdmin = () => {
    const navigate = useNavigate();
    const { setIsLoadingAPI } = useAppStore();
    const [chatbotList, setChatbotList] = useState([]);
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);

    const [chatbotName, setChatbotName] = useState('');
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    const handleClickCreate = () => {
        setIsOpenModalEdit(true);
    };

    const handleCancel = () => {
        setIsOpenModalEdit(false);
    };

    const handleChangeChatbotName = (e) => {
        setChatbotName(e.target.value);
    };

    const convertColumns = useMemo(() => {
        return [
            ...columnsChatbot,
            {
                title: 'Action',
                dataIndex: '',
                key: 'action',
                render: (text, record, index) => {
                    return (
                        <div className="flex items-center gap-1 z-50">
                            <button
                                onClick={() => navigate(`/admin/chatbot/${record.id}`)}
                                className="p-1 rounded hover:bg-slate-400 hover:text-white"
                            >
                                <FaRegEdit fontSize={18} />
                            </button>
                            <Popconfirm
                                title="Delete this product"
                                description="Are you sure to delete this product?"
                                okText="Yes"
                                cancelText="No"
                                placement="bottomRight"
                            >
                                <button className="p-1 rounded text-red-600 hover:bg-red-600 hover:text-white">
                                    <MdDeleteOutline fontSize={18} />
                                </button>
                            </Popconfirm>
                        </div>
                    );
                },
            },
        ];
    }, [navigate]);
    const fetchDataChatbot = async () => {
        try {
            setIsLoadingAPI(true);
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
            setIsLoadingAPI(false);
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
        </>
    );
};
export default ChatbotAdmin;
