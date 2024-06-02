import { Table, Popconfirm } from 'antd';
import { columns } from '~/data/data.product';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { colors } from '~/utils/common';
import productApi from '~/apis/product.api';
import useAppStore from '~/store';
import { toast } from 'react-toastify';

import ProductModal from './components/productModal';
import { DEFAULT_PRODUCT } from '~/constants/product';

const formattedColors = colors.map((color) => ({
    value: color,
    label: color,
}));

const ProductAdmin = () => {
    const { setIsLoadingAPI } = useAppStore();
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [itemSelected, setItemSelected] = useState();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [image, setImage] = useState(null);

    const [productList, setProductList] = useState([]);
    const timeoutRef = useRef();

    const fetchProductList = useCallback(async () => {
        try {
            setIsLoadingAPI(true);
            const res = await productApi.getAll();
            if (res.status === 200) {
                setProductList(res.data);
                console.log(res.data.length);
            } else {
                setProductList([]);
            }
        } catch (err) {
            console.log('product', err);
        } finally {
            setIsLoadingAPI(false);
        }
    }, [setIsLoadingAPI]);

    const handleOk = () => {
        setConfirmLoading(true);
        timeoutRef.current = setTimeout(() => {
            setIsOpenModalEdit(false);
            setConfirmLoading(false);
            setItemSelected();
        }, 2000);
    };

    const handleCancel = () => {
        setIsOpenModalEdit(false);
        setItemSelected();
    };

    const handleClickProductEdit = useCallback((item) => {
        console.log(item);
        setItemSelected(item);
        setIsOpenModalEdit(true);
    }, []);
    const handeDeleteProduct = useCallback(
        async (shoeId) => {
            try {
                const res = await productApi.delete(shoeId);
                if (res.status === 200) {
                    await toast.success('Xóa sản phẩm thành công', {
                        autoClose: 3000,
                    });
                    fetchProductList();
                }
            } catch (err) {
                console.log(err);
            }
        },
        [fetchProductList],
    );

    const convertColumns = useMemo(() => {
        return [
            ...columns,
            {
                title: 'Action',
                dataIndex: '',
                key: 'action',
                render: (text, record, index) => {
                    return (
                        <div className="flex items-center gap-1 z-50">
                            <button
                                onClick={() => handleClickProductEdit(record)}
                                className="p-1 rounded hover:bg-slate-400 hover:text-white"
                            >
                                <FaRegEdit fontSize={18} />
                            </button>
                            <Popconfirm
                                title="Delete this product"
                                description="Are you sure to delete this product?"
                                okText="Yes"
                                cancelText="No"
                                placement="bottomRight"
                                onConfirm={() => handeDeleteProduct(record.id)}
                            >
                                <button className="p-1 rounded text-red-600 hover:bg-red-600 hover:text-white">
                                    <MdDeleteOutline fontSize={18} />
                                </button>
                            </Popconfirm>
                        </div>
                    );
                },
            },
        ];
    }, [handeDeleteProduct, handleClickProductEdit]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImage(file);
            setPreviewUrl(url);
        }
    };

    const handleClearImage = () => {
        setImage();
        setPreviewUrl();
    };

    const handleCreateNewProduct = useCallback(() => {
        setItemSelected(DEFAULT_PRODUCT);
        setIsOpenModalEdit(true);
    }, []);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (productList.length === 0) {
            fetchProductList();
        }
    }, [fetchProductList, productList.length]);
    return (
        <>
            <div className="p-2">
                <div className="flex justify-end py-2">
                    <button
                        onClick={handleCreateNewProduct}
                        className="flex gap-2 items-center font-semibold bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                        <IoMdAdd />
                        Create new product
                    </button>
                </div>
                <Table dataSource={productList} columns={convertColumns} className="w-full" />
            </div>
            <ProductModal
                title="Edit Product"
                handleOk={handleOk}
                confirmLoading={confirmLoading}
                handleCancel={handleCancel}
                isOpenModalEdit={isOpenModalEdit}
                formattedColors={formattedColors}
                itemSelected={itemSelected}
                previewUrl={previewUrl}
                handleClearImage={handleClearImage}
                handleImageChange={handleImageChange}
                image={image}
            />
        </>
    );
};

export default ProductAdmin;
