import { convertISOToDateTime } from '~/utils/common';

export const columnsChatbot = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Tên',
        dataIndex: 'chatbot_name',
        key: 'chatbot_name',
        width: '20%',
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
        width: '30%',
    },
    {
        title: 'Tạo lúc',
        dataIndex: 'name',
        key: 'name',
        render: (text, record, index) => {
            return (
                <div className="flex items-center justify-center z-50">
                    <h5 className="text-sm font-semibold italic">{convertISOToDateTime(record.created_at)}</h5>
                </div>
            );
        },
    },
];
