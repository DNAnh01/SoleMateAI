import { Popconfirm, Table } from 'antd';
import adminOrderAPI from '~/apis/adminOrder.api';
import { orderColumns } from '~/data/data.order';
import useFetchData from '~/hooks/useFetchData';
import { FaTimes } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import useAppStore from '~/store';

const OrderAdmin = () => {
    const [orderList, setOrderList] = useState([]);
    const { setIsLoadingAPI } = useAppStore();

    const { data } = useFetchData(adminOrderAPI.getAll);

    const columns = [
        ...orderColumns,
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) => {
                return (
                    <div className="flex gap-2">
                        <Popconfirm
                            title="Hủy đơn hàng"
                            placement="bottomLeft"
                            description="Bạn có chắc hủy đơn hàng này?"
                        >
                            <button className="p-2 border rounded-md border-slate-600 text-red-500">
                                <FaTimes fontSize={20} />
                            </button>
                        </Popconfirm>
                        <Popconfirm
                            title="Xác nhận vận chuyển"
                            placement="bottomLeft"
                            description="Bạn có chắc xác nhận vận chuyển đơn hàng này?"
                        >
                            <button className="p-2 border text-green-500 rounded-md border-slate-600">
                                <TbTruckDelivery fontSize={20} />
                            </button>
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        setIsLoadingAPI(true);
        if (data) {
            setOrderList(data);
            setIsLoadingAPI(false);
        }
        return () => {
            setIsLoadingAPI(false);
        };
    }, [data, setIsLoadingAPI]);
    return (
        <div>
            <Table columns={columns} dataSource={orderList} />
        </div>
    );
};
export default OrderAdmin;
