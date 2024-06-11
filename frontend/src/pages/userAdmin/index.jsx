import { Popconfirm, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TbLockX } from 'react-icons/tb';
import UserAdminAPI from '~/apis/userAdmin.api';
import Loading from '~/components/loading/loading';
import { columnsUser } from '~/data/data.user';

const AdminUserPage = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const handleBlogUser = useCallback(async (id) => {
        try {
            setIsLoading(true);
            const res = await UserAdminAPI.block(id);
            if (res.status === 200) {
                toast.success('Chặn người dùng thành công.');
            }
        } catch (_) {
            toast.success('Chặn người dùng thất bại.');
        } finally {
            setIsLoading(false);
        }
    }, []);
    const columns = [
        ...columnsUser,
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (text, record, index) => {
                if (record.role_name === 'user') {
                    return (
                        <div className="flex items-center gap-1 z-50">
                            <Popconfirm
                                title="Block user"
                                description="Are you sure to block this user?"
                                okText="Yes"
                                cancelText="No"
                                placement="bottomRight"
                                onConfirm={() => handleBlogUser(record.id)}
                            >
                                <button className="p-1 rounded text-red-600 hover:bg-red-600 hover:text-white">
                                    <TbLockX fontSize={18} />
                                </button>
                            </Popconfirm>
                        </div>
                    );
                }
            },
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await UserAdminAPI.getAll();
                setData(res.data);
                console.log('res', res.data);
            } catch (err) {
                console.err(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <Table columns={columns} dataSource={data} />
            <Loading isLoading={isLoading} />
        </div>
    );
};
export default AdminUserPage;
