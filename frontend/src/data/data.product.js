import { getRandomColor } from '~/utils/common';
export const dataSource = [
    {
        shoe_id_uuid: '1',
        brand_id_uuid: 'brand-id-1',
        color_id_uuid: '1',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7ZDAPdOOnq63KuU6vcG9TO1getxz7uKKHnA7ZtKYMw&s',
        name: 'Shoe Name 1',
        description: 'Description for shoe 1',
        quantity: 88,
        price: '95.17',
        warehouse: '33.29',
        discount: '31%',
        active: false,
    },
    {
        shoe_id_uuid: '2',
        brand_id_uuid: 'brand-id-2',
        color_id_uuid: '2',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7ZDAPdOOnq63KuU6vcG9TO1getxz7uKKHnA7ZtKYMw&s',
        name: 'Shoe Name 2',
        description: 'Description for shoe 2',
        quantity: 41,
        price: '45.90',
        warehouse: '42.06',
        discount: '42%',
        active: true,
    },
    {
        shoe_id_uuid: '3',
        brand_id_uuid: 'brand-id-3',
        color_id_uuid: '3',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7ZDAPdOOnq63KuU6vcG9TO1getxz7uKKHnA7ZtKYMw&s',
        name: 'Shoe Name 3',
        description: 'Description for shoe 3',
        quantity: 14,
        price: '79.55',
        warehouse: '5.42',
        discount: '21%',
        active: true,
    },
    {
        shoe_id_uuid: '4',
        brand_id_uuid: 'brand-id-4',
        color_id_uuid: '4',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7ZDAPdOOnq63KuU6vcG9TO1getxz7uKKHnA7ZtKYMw&s',
        name: 'Shoe Name 4',
        description: 'Description for shoe 4',
        quantity: 12,
        price: '17.62',
        warehouse: '44.92',
        discount: '40%',
        active: true,
    },
    {
        shoe_id_uuid: '5',
        brand_id_uuid: 'brand-id-5',
        color_id_uuid: '5',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7ZDAPdOOnq63KuU6vcG9TO1getxz7uKKHnA7ZtKYMw&s',
        name: 'Shoe Name 5',
        description: 'Description for shoe 5',
        quantity: 98,
        price: '93.63',
        warehouse: '29.48',
        discount: '27%',
        active: false,
    },
    {
        shoe_id_uuid: '6',
        brand_id_uuid: 'brand-id-6',
        color_id_uuid: '6',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7ZDAPdOOnq63KuU6vcG9TO1getxz7uKKHnA7ZtKYMw&s',
        name: 'Shoe Name 6',
        description: 'Description for shoe 6',
        quantity: 4,
        price: '85.39',
        warehouse: '58.75',
        discount: '31%',
        active: false,
    },
    {
        shoe_id_uuid: '7',
        brand_id_uuid: 'brand-id-7',
        color_id_uuid: '7',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7ZDAPdOOnq63KuU6vcG9TO1getxz7uKKHnA7ZtKYMw&s',
        name: 'Shoe Name 7',
        description: 'Description for shoe 7',
        quantity: 27,
        price: '10.79',
        warehouse: '4.25',
        discount: '4%',
        active: false,
    },
    {
        shoe_id_uuid: '8',
        brand_id_uuid: 'brand-id-8',
        color_id_uuid: '8',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7ZDAPdOOnq63KuU6vcG9TO1getxz7uKKHnA7ZtKYMw&s',
        name: 'Shoe Name 8',
        description: 'Description for shoe 8',
        quantity: 59,
        price: '45.40',
        warehouse: '2.61',
        discount: '11%',
        active: true,
    },
    {
        shoe_id_uuid: '9',
        brand_id_uuid: 'brand-id-9',
        color_id_uuid: '9',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7ZDAPdOOnq63KuU6vcG9TO1getxz7uKKHnA7ZtKYMw&s',
        name: 'Shoe Name 9',
        description: 'Description for shoe 9',
        quantity: 10,
        price: '87.69',
        warehouse: '10.45',
        discount: '5%',
        active: false,
    },
    {
        shoe_id_uuid: '10',
        brand_id_uuid: 'brand-id-10',
        color_id_uuid: '10',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7ZDAPdOOnq63KuU6vcG9TO1getxz7uKKHnA7ZtKYMw&s',
        name: 'Shoe Name 10',
        description: 'Description for shoe 10',
        quantity: 15,
        price: '91.88',
        warehouse: '5.73',
        discount: '37%',
        active: true,
    },
    {
        shoe_id_uuid: '11',
        brand_id_uuid: 'brand-id-11',
        color_id_uuid: '11',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7ZDAPdOOnq63KuU6vcG9TO1getxz7uKKHnA7ZtKYMw&s',
        name: 'Shoe Name 11',
        description: 'Description for shoe 11',
        quantity: 13,
        price: '7.57',
        warehouse: '42.37',
        discount: '10%',
        active: true,
    },
    {
        shoe_id_uuid: '12',
        brand_id_uuid: 'brand-id-12',
        color_id_uuid: '12',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7ZDAPdOOnq63KuU6vcG9TO1getxz7uKKHnA7ZtKYMw&s',
        name: 'Shoe Name 12',
        description: 'Description for shoe 12',
        quantity: 92,
        price: '73.82',
        warehouse: '18.74',
        discount: '37%',
        active: false,
    },
    {
        shoe_id_uuid: '13',
        brand_id_uuid: 'brand-id-13',
        color_id_uuid: '13',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7ZDAPdOOnq63KuU6vcG9TO1getxz7uKKHnA7ZtKYMw&s',
        name: 'Shoe Name 13',
        description: 'Description for shoe 13',
        quantity: 58,
        price: '91.26',
        warehouse: '57.07',
        discount: '22%',
        active: false,
    },
    {
        shoe_id_uuid: '14',
        brand_id_uuid: 'brand-id-14',
        color_id_uuid: '14',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7ZDAPdOOnq63KuU6vcG9TO1getxz7uKKHnA7ZtKYMw&s',
        name: 'Shoe Name 14',
        description: 'Description for shoe 14',
        quantity: 66,
        price: '73.02',
        warehouse: '56.97',
        discount: '4%',
        active: false,
    },
    {
        shoe_id_uuid: '15',
        brand_id_uuid: 'brand-id-15',
        color_id_uuid: '15',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7ZDAPdOOnq63KuU6vcG9TO1getxz7uKKHnA7ZtKYMw&s',
        name: 'Shoe Name 15',
        description: 'Description for shoe 15',
        quantity: 63,
        price: '67.58',
        warehouse: '8.81',
        discount: '23%',
        active: true,
    },
    {
        shoe_id_uuid: '16',
        brand_id_uuid: 'brand-id-16',
        color_id_uuid: '16',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7ZDAPdOOnq63KuU6vcG9TO1getxz7uKKHnA7ZtKYMw&s',
        name: 'Shoe Name 16',
        description: 'Description for shoe 16',
        quantity: 15,
        price: '69.53',
        warehouse: '12.85',
        discount: '24%',
        active: false,
    },
    {
        shoe_id_uuid: '17',
        brand_id_uuid: 'brand-id-17',
        color_id_uuid: '17',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7ZDAPdOOnq63KuU6vcG9TO1getxz7uKKHnA7ZtKYMw&s',
        name: 'Shoe Name 17',
        description: 'Description for shoe 17',
        quantity: 30,
        price: '47.04',
        warehouse: '65.00',
        discount: '18%',
        active: true,
    },
    {
        shoe_id_uuid: '18',
        brand_id_uuid: 'brand-id-18',
        color_id_uuid: '18',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7ZDAPdOOnq63KuU6vcG9TO1getxz7uKKHnA7ZtKYMw&s',
        name: 'Shoe Name 18',
        description: 'Description for shoe 18',
        quantity: 18,
        price: '33.28',
        warehouse: '70.10',
        discount: '13%',
        active: false,
    },
    {
        shoe_id_uuid: '19',
        brand_id_uuid: 'brand-id-19',
        color_id_uuid: '19',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7ZDAPdOOnq63KuU6vcG9TO1getxz7uKKHnA7ZtKYMw&s',
        name: 'Shoe Name 19',
        description: 'Description for shoe 19',
        quantity: 13,
        price: '54.41',
        warehouse: '51.37',
        discount: '30%',
        active: false,
    },
    {
        shoe_id_uuid: '20',
        brand_id_uuid: 'brand-id-20',
        color_id_uuid: '20',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7ZDAPdOOnq63KuU6vcG9TO1getxz7uKKHnA7ZtKYMw&s',
        name: 'Shoe Name 20',
        description: 'Description for shoe 20',
        quantity: 80,
        price: '5.12',
        warehouse: '48.39',
        discount: '10%',
        active: true,
    },
];

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
