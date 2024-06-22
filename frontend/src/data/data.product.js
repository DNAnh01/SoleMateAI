export const columns = [
    {
        title: 'Mã số',
        dataIndex: 'id',
        key: 'id',
        width: '10px',
    },
    {
        title: 'Thương hiệu',
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
        title: 'Màu sắc',
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
        title: 'Hình ảnh',
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
        title: 'Tên sản phẩm',
        dataIndex: 'shoe_name',
        key: 'shoe_name',
        width: '10%',
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
        width: '20%',
    },
    {
        title: 'Kích cỡ',
        dataIndex: 'size',
        key: 'size',
        render: (text, record, index) => {
            return <p className="text-center">{record.size.size_number}</p>;
        },
    },
    {
        title: 'Số lượng trong kho',
        dataIndex: 'quantity_in_stock',
        key: 'quantity_in_stock',
    },
    {
        title: 'Giá niêm yết',
        dataIndex: 'display_price',
        key: 'display_price',
    },
    {
        title: 'Giá kho',
        dataIndex: 'warehouse_price',
        key: 'warehouse_price',
    },
    {
        title: 'Giá giảm',
        dataIndex: 'discounted_price',
        key: 'discounted_price',
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
        label: 'Hoạt động',
    },
    {
        value: 'inactive',
        label: 'Không hoạt động',
    },
];
