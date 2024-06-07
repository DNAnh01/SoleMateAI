import { Popconfirm, Table } from 'antd';
import adminOrderAPI from '~/apis/adminOrder.api';
import { orderColumns } from '~/data/data.order';
import useFetchData from '~/hooks/useFetchData';
import { FaTimes } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Loading from '~/components/loading/loading';

const OrderAdmin = () => {
    const [orderList, setOrderList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { data, refresh } = useFetchData(adminOrderAPI.getAll);

    const handleCancelOrder = useCallback(
        async (id) => {
            try {
                const res = await adminOrderAPI.cancelOrder(id);
                if (res.status === 200) {
                    toast.success('Hủy đơn hàng thành công');
                    refresh();
                }
            } catch (_) {
                toast.error('Hủy đơn hàng thất bại');
            }
        },
        [refresh],
    );

    const handleDeliveOrder = useCallback(
        async (id) => {
            try {
                const res = await adminOrderAPI.deliveOrder(id);
                if (res.status === 200) {
                    toast.success('Xác nhận vận chuyển đơn hàng thành công');
                    refresh();
                }
            } catch (_) {
                toast.error('Xác nhận vận chuyển đơn hàng thất bại');
            }
        },
        [refresh],
    );
    const columns = [
        ...orderColumns,
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) => {
                return (
                    <div className="flex gap-2">
                        {new Date(record.delivery_date) < new Date() && (
                            <Popconfirm
                                title="Hủy đơn hàng"
                                placement="bottomLeft"
                                description="Bạn có chắc hủy đơn hàng này?"
                                onConfirm={() => handleCancelOrder(record.id)}
                            >
                                <button
                                    title="Hủy đơn hàng"
                                    className="p-2 border rounded-md border-slate-600 text-red-500 hover:text-red-700"
                                >
                                    <FaTimes fontSize={20} />
                                </button>
                            </Popconfirm>
                        )}

                        {record.status === 'ORDER-PLACED' && (
                            <Popconfirm
                                title="Xác nhận vận chuyển"
                                placement="bottomLeft"
                                description="Bạn có chắc xác nhận vận chuyển đơn hàng này?"
                                onConfirm={() => handleDeliveOrder(record.id)}
                            >
                                <button
                                    title="Xác nhận vận chuyển"
                                    className="p-2 border text-green-500 hover:text-green-700 rounded-md border-slate-600"
                                >
                                    <TbTruckDelivery fontSize={20} />
                                </button>
                            </Popconfirm>
                        )}
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        setIsLoading(true);
        if (data) {
            setOrderList(data);
            setIsLoading(false);
        }
    }, [data]);
    return (
        <>
            <div>
                <Table columns={columns} dataSource={orderList} />
            </div>
            <Loading isLoading={isLoading} />
        </>
    );
};
export default OrderAdmin;
