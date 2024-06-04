import { convertISOToDateTime } from '~/utils/common';

export const columnsUpdateChatbot = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Tên Cơ sở tri thức',
        dataIndex: 'knowledge_base_name',
        key: 'knowledge_base_name',
        width: '20%',
    },
    {
        title: 'Kích thước tệp',
        dataIndex: 'file_size',
        key: 'file_size',
    },
    {
        title: 'Loại nội dung',
        dataIndex: 'content_type',
        key: 'content_type',
    },
    {
        title: 'Hoạt động',
        dataIndex: 'is_active',
        key: 'is_active',
        render: (text, record, index) => {
            return (
                <div className="flex items-center justify-center z-50">
                    {record.is_active ? (
                        <div className="bg-green-400  font-semibold px-2 py-1 rounded-full">
                            <h5 className="text-sm text-white">Hoạt động</h5>
                        </div>
                    ) : (
                        <div className="bg-red-400  font-semibold px-2 py-1 rounded-full">
                            <h5 className="text-sm text-white">Không hoạt động</h5>
                        </div>
                    )}
                </div>
            );
        },
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (text, record, index) => {
            return (
                <div className="flex items-center justify-center z-50">
                    <h5 className="text-sm font-semibold italic">{convertISOToDateTime(record.created_at)}</h5>
                </div>
            );
        },
    },
];
