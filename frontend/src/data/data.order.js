import { LuWarehouse } from 'react-icons/lu';
import { FaLocationPinLock } from 'react-icons/fa6';

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
                        <LuWarehouse fontSize={30} />
                        <div className="flex-1">
                            <div className="h-[2px]  bg-black"></div>
                        </div>
                        <FaLocationPinLock fontSize={30} />
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
