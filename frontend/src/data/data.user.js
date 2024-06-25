export const columnsUser = [
    {
        title: 'Mã',
        dataIndex: 'id',
        key: 'id',
        width: '10px',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Tên hiển thị',
        dataIndex: 'display_name',
        key: 'display_name',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone_number',
        key: 'phone_number',
    },
    {
        title: 'Ảnh đại diện',
        dataIndex: 'avatar_url',
        key: 'avatar_url',
        render: (text, record, index) => {
            return (
                <div className="flex items-center justify-start z-50">
                    <img src={record.avatar_url} alt={record.display_name} className="w-[50px] h-[50px] rounded-full" />
                </div>
            );
        },
    },
    {
        title: 'Vai trò',
        dataIndex: 'role_name',
        key: 'role_name',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'active',
        key: 'active',
        render: (text, record, index) => {
            return (
                <div className="flex items-center justify-start z-50">
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
];
