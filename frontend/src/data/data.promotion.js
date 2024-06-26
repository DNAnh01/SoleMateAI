export const promotionColumns = [
    {
        title: 'Mã số',
        dataIndex: 'id',
        key: 'id',
        width: '10px',
    },
    {
        title: 'Tên',
        dataIndex: 'promotion_name',
        key: 'promotion_name',
    },
    {
        title: 'Bắt đầu',
        dataIndex: 'start_date',
        key: 'start_date',
        render: (text, record, index) => {
            return (
                <div>
                    <p>{formatDate(record.start_date)}</p>
                </div>
            );
        },
    },
    {
        title: 'Kết thúc',
        dataIndex: 'end_date',
        key: 'end_date',
        render: (text, record, index) => {
            return (
                <div>
                    <p>{formatDate(record.end_date)}</p>
                </div>
            );
        },
    },
    {
        title: 'Phần trăm',
        dataIndex: 'discount_percent',
        key: 'discount_percent',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'is_active',
        key: 'is_active',
        render: (text, record, index) => {
            return (
                <div className="flex items-center justify-start z-50">
                    {record.is_active ? (
                        <div className="bg-green-400 font-semibold px-2 py-1 rounded-full">
                            <h5 className="text-sm text-white">Hoạt động</h5>
                        </div>
                    ) : (
                        <div className="bg-red-400 font-semibold px-2 py-1 rounded-full">
                            <h5 className="text-sm text-white">Không hoạt động</h5>
                        </div>
                    )}
                </div>
            );
        },
    },
];

export const formatDate = (isoString, dateFormat = 'DD/MM/YYYY') => {
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    if (dateFormat === 'YYYY/MM/DD') {
        return `${year}/${month}/${day}`;
    }
    return `${day}/${month}/${year}`;
};

export const dateFormat = 'YYYY/MM/DD';
