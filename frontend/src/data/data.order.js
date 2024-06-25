import { FaFlagCheckered } from 'react-icons/fa';
import { TiCancel } from 'react-icons/ti';
import { BsClipboardCheck } from 'react-icons/bs';
import { AiOutlineDeliveredProcedure } from 'react-icons/ai';

export const orderColumns = [
    {
        title: 'Mã đơn hàng',
        dataIndex: 'id',
        key: 'id',
        width: '10px',
    },
    {
        title: 'Sản phẩm',
        dataIndex: 'order_items',
        key: 'order_items',
        render: (text, record, index) => {
            return (
                <div className="flex flex-col gap-3">
                    {record.order_items?.map((item, index) => {
                        return (
                            <div key={index} className="flex items-center flex-col h-[80px]">
                                <img src={item.shoe.image_url} alt={item.shoe.shoe_name} className="h-[60px]" />
                                <p>{item.shoe.shoe_name}</p>
                            </div>
                        );
                    })}
                </div>
            );
        },
    },
    {
        title: 'Số lượng',
        dataIndex: 'order_items',
        key: 'Quantity',
        render: (text, record, index) => {
            return (
                <div>
                    {record.order_items?.map((item, index) => {
                        return (
                            <div key={index} className="h-[80px] flex items-center justify-center">
                                <p>{item.quantity}</p>
                            </div>
                        );
                    })}
                </div>
            );
        },
    },
    {
        title: 'Giá',
        dataIndex: 'order_items',
        key: 'Price',
        render: (text, record, index) => {
            return (
                <div>
                    {record.order_items?.map((item, index) => {
                        return (
                            <div key={index} className="h-[80px] flex items-center justify-center">
                                <p>{item.display_price}</p>
                            </div>
                        );
                    })}
                </div>
            );
        },
    },
    {
        title: 'Tổng số sản phẩm',
        dataIndex: 'total_item',
        key: 'total_item',
    },
    {
        title: 'Tổng giá',
        dataIndex: 'total_display_price',
        key: 'total_display_price',
    },
    {
        title: 'Giá giảm',
        dataIndex: 'total_discounted_price',
        key: 'total_discounted_price',
    },
    {
        title: 'Giá kho',
        dataIndex: 'total_warehouse_price',
        key: 'total_warehouse_price',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'shipping_address',
        key: 'shipping_address',
        width: '200px',
        render: (text, record, index) => {
            return (
                <>
                    <div className="flex items-center justify-center">{DestinationIcon(record.status)}</div>
                    <div className="mt-2">
                        <h3 className="text-sm">
                            {record.shipping_address.ward} - {record.shipping_address.district} -{' '}
                            {record.shipping_address.province}
                        </h3>
                    </div>
                </>
            );
        },
    },
];

const DestinationIcon = (status) => {
    switch (status) {
        case 'ORDER-DELIVERED':
            return <FaFlagCheckered fill="#0bc023" fontSize={30} />;
        case 'ORDER-PLACED':
            return <BsClipboardCheck fill="#f1c232" fontSize={30} />;
        case 'ORDER-SHIPPING':
            return <AiOutlineDeliveredProcedure fill="#3899f0" fontSize={30} />;
        default:
            return <TiCancel fill="#fb2414" fontSize={30} />;
    }
};
