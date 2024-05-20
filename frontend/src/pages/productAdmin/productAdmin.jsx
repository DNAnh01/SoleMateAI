import { Table } from 'antd';
import { columns, dataSource } from '~/data/data.product';

const ProductAdmin = () => {
    return (
        <div className="p-2">
            <Table dataSource={dataSource} columns={columns} className="w-full" />
        </div>
    );
};

export default ProductAdmin;
