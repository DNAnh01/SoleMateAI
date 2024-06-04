import { IoHomeOutline } from 'react-icons/io5';
import { FaFlagCheckered } from 'react-icons/fa';
import { TiCancel } from 'react-icons/ti';
import { BsClipboardCheck } from 'react-icons/bs';
import { AiOutlineDeliveredProcedure } from 'react-icons/ai';

export const orderColumns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        width: '10px',
    },
    {
        title: 'Product',
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
        title: 'Quantity',
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
        title: 'Price',
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
        title: 'Total',
        dataIndex: 'total_item',
        key: 'total_item',
    },
    {
        title: 'Total Price',
        dataIndex: 'total_display_price',
        key: 'total_display_price',
    },
    {
        title: 'Discount Price',
        dataIndex: 'total_discounted_price',
        key: 'total_discounted_price',
    },
    {
        title: 'Warehouse Price',
        dataIndex: 'total_warehouse_price',
        key: 'total_warehouse_price',
    },
    {
        title: 'Status',
        dataIndex: 'shipping_address',
        key: 'shipping_address',
        width: '200px',
        render: (text, record, index) => {
            return (
                <>
                    <div className="flex items-center gap-1 ">
                        <IoHomeOutline fontSize={30} />
                        <div className="flex-1">
                            <div className="h-[2px]  bg-black"></div>
                        </div>
                        {DestinationIcon(record.status)}
                    </div>
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
