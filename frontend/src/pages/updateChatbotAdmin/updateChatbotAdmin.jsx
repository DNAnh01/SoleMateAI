import { useEffect, useMemo, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ChatbotAPI } from '~/apis/chatbot.api';
import useAppStore from '~/store';
import { MdDeleteOutline } from 'react-icons/md';
import { FaRegFilePdf } from 'react-icons/fa6';
import { LuFileInput } from 'react-icons/lu';
import { IoMdClose } from 'react-icons/io';
import { Modal, Popconfirm, Table } from 'antd';
import { toast } from 'react-toastify';
import { IoMdAdd } from 'react-icons/io';
import { columnsUpdateChatbot } from '~/data/data.updateChatbot';

const UpdateChatbotAdmin = () => {
    const { id } = useParams();
    const { setIsLoadingAPI, setIsShowOverlay } = useAppStore();
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [chatbotDetails, setChatbotDetails] = useState([]);
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    const [fileSelected, setFileSelected] = useState(null);

    const handleCreateKnowledgeChatbot = useCallback(async () => {
        try {
            setIsShowOverlay(true);
            setIsLoadingForm(true);
            const formData = new FormData();
            formData.append('file', fileSelected);

            const res = await ChatbotAPI.createKnowledgeChatbot(id, formData);

            if (res.status === 200) {
                fetchDataChatbotDetails();
                toast.success('Tạo cơ sở kiến thức thành công!', { autoClose: 3000 });
                setIsOpenModalEdit(false);
            } else {
                toast.error('Tạo cơ sở kiến thức thất bại. Vui lòng thử lại sau.', { autoClose: 3000 });
            }
        } catch (_) {
            toast.error('Tạo cơ sở kiến thức thất bại. Vui lòng thử lại sau.', { autoClose: 3000 });
        } finally {
            setIsShowOverlay(false);
            setIsLoadingForm(false);
        }
        // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
    }, [fileSelected, id, setIsShowOverlay]);

    const handleCancel = () => {
        setIsOpenModalEdit(false);
    };

    const handleClickAddNew = () => {
        setIsOpenModalEdit(true);
    };

    const handleChangeFile = (e) => {
        setFileSelected(e.target.files[0]);
    };

    const handleClearFile = () => {
        setFileSelected(null);
    };

    const fetchDataChatbotDetails = useCallback(async () => {
        try {
            setIsLoadingAPI(true);
            const res = await ChatbotAPI.getKnowledgeChatbotDetails(id);
            if (res.status === 200) {
                setChatbotDetails(res.data);
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
    }, [id, setIsLoadingAPI]);

    const convertColumns = useMemo(() => {
        return [
            ...columnsUpdateChatbot,
            {
                title: 'Action',
                dataIndex: '',
                key: 'action',
                render: (text, record, index) => {
                    return (
                        <div className="flex items-center gap-1 z-50">
                            <Popconfirm
                                title="Delete this file"
                                description="Are you sure to delete this file?"
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
    }, []);

    useEffect(() => {
        fetchDataChatbotDetails();
    }, [fetchDataChatbotDetails, id]);
    return (
        <>
            <div className="p-4">
                <Table columns={convertColumns} dataSource={chatbotDetails} pagination={chatbotDetails > 5} />
                <div className="flex justify-center py-6">
                    <button
                        onClick={handleClickAddNew}
                        className="flex font-medium items-center gap-1 px-2 py-1 bg-slate-500 rounded-md text-white hover:bg-slate-600"
                    >
                        <IoMdAdd />
                        Thêm cơ sở kiến ​​thức tập tin
                    </button>
                </div>
            </div>
            <Modal
                title={'Thêm cơ sở kiến ​​thức tập tin'}
                open={isOpenModalEdit}
                cancelText="Hủy"
                onOk={handleCreateKnowledgeChatbot}
                confirmLoading={isLoadingForm}
                onCancel={handleCancel}
                className="min-w-[200px]"
            >
                <div className="flex flex-col gap-4 overflow-y-auto min-h-[80px] py-4">
                    <div className="flex relative flex-col gap-1">
                        <label
                            htmlFor="file"
                            className="border-slate-500 cursor-pointer gap-2 items-center py-10 border rounded-2xl flex flex-col"
                        >
                            {fileSelected ? (
                                <>
                                    <FaRegFilePdf fontSize={56} />
                                    <span className="text-xl text-center font-medium">{fileSelected.name}</span>
                                </>
                            ) : (
                                <>
                                    <LuFileInput fontSize={56} />
                                    <span className="text-xl text-center font-medium">Thêm tập tin</span>
                                </>
                            )}
                        </label>
                        <input
                            type="file"
                            onChange={handleChangeFile}
                            className="hidden"
                            id="file"
                            accept="application/pdf"
                        />
                        {fileSelected && (
                            <button
                                onClick={handleClearFile}
                                className="absolute top-2 right-2 border border-slate-600 z-[1000]  hover:bg-slate-300 p-1.5 rounded-full"
                            >
                                <IoMdClose fontSize={18} />
                            </button>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default UpdateChatbotAdmin;
