import { convertISOToDateTime } from '~/utils/common';
import { MdOutlinePublic, MdOutlinePublicOff } from 'react-icons/md';

export const columnsChatbot = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'chatbot_name',
        key: 'chatbot_name',
        width: '20%',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: '30%',
    },
    {
        title: 'Active',
        dataIndex: 'is_active',
        key: 'is_active',
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
    {
        title: 'Public',
        dataIndex: 'is_public',
        key: 'is_public',
        render: (text, record, index) => {
            return (
                <div className="flex items-center justify-center z-50">
                    {record.is_public ? <MdOutlinePublic fontSize={28} /> : <MdOutlinePublicOff fontSize={28} />}
                </div>
            );
        },
    },
    {
        title: 'Created at',
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
