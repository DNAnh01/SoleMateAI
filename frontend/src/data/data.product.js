export const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        width: '10px',
    },
    {
        title: 'Brand',
        dataIndex: 'brand_id_uuid',
        key: 'brand',
        width: '10px',
        render: (text, record, index) => {
            return (
                <div>
                    <img src={record.brand.brand_logo} alt={record.brand.brand_name} className="w-[50px]" />

                    <p>{record.brand.brand_name}</p>
                </div>
            );
        },
    },
    {
        title: 'Color',
        dataIndex: 'color_id_uuid',
        key: 'color',
        render: (text, record, index) => {
            return (
                <div className="flex items-center justify-center z-50">
                    <div
                        className="w-[20px] h-[20px] rounded-full"
                        style={{
                            backgroundColor: record.color.hex_value,
                        }}
                    ></div>
                </div>
            );
        },
    },
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (text, record, index) => {
            return (
                <div className="flex items-center justify-center z-50">
                    <img src={record.image_url} alt={record.shoe_name} className="w-[80px] rounded-lg" />
                </div>
            );
        },
    },
    {
        title: 'Name',
        dataIndex: 'shoe_name',
        key: 'shoe_name',
        width: '10%',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: '20%',
    },
    {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
        render: (text, record, index) => {
            return <p className="text-center">{record.size.size_number}</p>;
        },
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity_in_stock',
        key: 'quantity_in_stock',
    },
    {
        title: 'Display Price',
        dataIndex: 'display_price',
        key: 'display_price',
    },
    {
        title: 'Warehouse Price',
        dataIndex: 'warehouse_price',
        key: 'warehouse_price',
    },
    {
        title: 'Discount',
        dataIndex: 'discounted_price',
        key: 'discounted_price',
    },
    {
        title: 'Active',
        dataIndex: 'active',
        key: 'active',
        render: (text, record, index) => {
            return (
                <div className="flex items-center justify-center z-50">
                    {record.is_active ? (
                        <div className="bg-green-400  font-semibold px-2 py-1 rounded-full">
                            <h5 className="text-sm text-white">Active</h5>
                        </div>
                    ) : (
                        <div className="bg-red-400  font-semibold px-2 py-1 rounded-full">
                            <h5 className="text-sm text-white">Inactive</h5>
                        </div>
                    )}
                </div>
            );
        },
    },
];

export const BRAND = [
    {
        value: 'Nike',
        label: 'Nike',
    },
    {
        value: 'Puma',
        label: 'Puma',
    },
    {
        value: 'Adidas',
        label: 'Adidas',
    },
];

export const STATUS = [
    {
        value: 'active',
        label: 'Active',
    },
    {
        value: 'inactive',
        label: 'Inactive',
    },
];
