import { Popconfirm, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import promotionApi from '~/apis/promotion.api';
import { MdDeleteOutline } from 'react-icons/md';
import Loading from '~/components/loading/loading';
import { promotionColumns } from '~/data/data.promotion';
import useFetchData from '~/hooks/useFetchData';
import PromotionModal from './components/PromotionModal';
import { convertToTargetTimestamp } from '~/utils/common';
import toast from 'react-hot-toast';
const today = new Date();
const PromotionAdmin = () => {
    const navigate = useNavigate();
    const [isHover, setIsHover] = useState(false);
    const [productChoosed, setProductsChoosed] = useState([]);
    const [promotionList, setPromotionList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const confirm = async (e, id) => {
        try {
            const res = await promotionApi.delete(id);
            if (res.status === 200) {
                toast.success('Xoá khuyến mãi thành công.');
            }
        } catch (e) {
            toast.success('Xoá khuyến mãi thất bại.');
        }
    };
    const cancel = (e) => {
        console.log(e);
    };

    const columns = [
        ...promotionColumns,
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) => {
                return (
                    <div
                        className="flex items-center justify-center z-[100]"
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => {
                            setIsHover(false);
                        }}
                    >
                        <Popconfirm
                            title="Xóa khuyến mãi"
                            description="Bạn có chắc chắn muốn xóa khuyến mãi này?"
                            onConfirm={(e) => confirm(e, record.id)}
                            onCancel={cancel}
                            okText="Xóa"
                            cancelText="Hủy"
                        >
                            <button className=" text-red-500 hover:bg-red-500 hover:text-white p-1 rounded-md">
                                <MdDeleteOutline fontSize={24} />
                            </button>
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];

    const [dataPromotionForm, setDataPromotionForm] = useState({
        promotion_name: '',
        start_date: today.toISOString(),
        end_date: today.toISOString(),
        discount_percent: 0,
        shoe_ids: [],
    });

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleClickCreate = () => {
        setIsOpenModal(true);
    };

    const handleCancel = () => {
        setIsOpenModal(false);
    };

    const handleOk = async () => {
        try {
            setIsLoading(true);
            setConfirmLoading(true);
            const payload = {
                ...dataPromotionForm,
                start_date: convertToTargetTimestamp(dataPromotionForm?.start_date),
                end_date: convertToTargetTimestamp(dataPromotionForm?.end_date),
                shoe_ids: productChoosed.map((item) => item?.id),
            };
            const res = await promotionApi.create(payload);
            if (res.status === 201) {
                toast.success('Tạo khuyến mại thành công.');
                setDataPromotionForm({
                    promotion_name: '',
                    start_date: today.toISOString(),
                    end_date: today.toISOString(),
                    discount_percent: 0,
                    shoe_ids: [],
                });
                await refresh();
            }
        } catch (err) {
            console.log('error creating promotion', err);
            toast.error('Tạo khuyến mại thất bại.');
        } finally {
            setIsLoading(false);
            setConfirmLoading(false);
            setIsOpenModal(false);
        }
    };

    const { data, refresh } = useFetchData(promotionApi.getAllPromotion);
    useEffect(() => {
        setIsLoading(true);
        if (data) {
            setPromotionList(data);
            setIsLoading(false);
        }
    }, [data]);
    return (
        <>
            <div>
                <div className="mb-6 flex justify-end p-2">
                    <button
                        onClick={handleClickCreate}
                        className="flex gap-2 items-center font-semibold bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                        <IoMdAdd />
                        Tạo khuyến mại mới
                    </button>
                </div>
                <Table
                    columns={columns}
                    dataSource={promotionList}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                if (!isHover) {
                                    navigate(`/admin/promotion/${record.id}`);
                                }
                            },
                        };
                    }}
                />
            </div>
            <PromotionModal
                isOpenModal={isOpenModal}
                handleOk={handleOk}
                confirmLoading={confirmLoading}
                handleCancel={handleCancel}
                dataPromotionForm={dataPromotionForm}
                setDataPromotionForm={setDataPromotionForm}
                productChoosed={productChoosed}
                setProductsChoosed={setProductsChoosed}
            />
            <Loading isLoading={isLoading} />
        </>
    );
};

export default PromotionAdmin;
