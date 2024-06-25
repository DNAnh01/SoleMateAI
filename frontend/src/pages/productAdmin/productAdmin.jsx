import { Table, Popconfirm } from 'antd';
import { columns } from '~/data/data.product';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { useCallback, useEffect, useMemo, useState } from 'react';
import productApi from '~/apis/product.api';
import { toast } from 'react-toastify';

import ProductModal from './components/productModal';
import { DEFAULT_PRODUCT } from '~/constants/product';
import Loading from '~/components/loading/loading';

const ProductAdmin = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [itemSelected, setItemSelected] = useState();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [title, setTitle] = useState('Chỉnh sửa sản phẩm');
    const [image, setImage] = useState(null);

    const [productList, setProductList] = useState([]);
    const fetchProductList = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await productApi.getAll();
            if (res.status === 200) {
                setProductList(res.data);
                // console.log(res.data.length);
            } else {
                setProductList([]);
            }
        } catch (err) {
            console.log('product', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleSubmit = async () => {
        try {
            setConfirmLoading(true);
            if (itemSelected.id) {
                // const res = await productApi.updateProduct(itemSelected.id, itemSelected);
                // console.log('update', JSON.stringify(itemSelected));
            } else {
                const reader = await new FileReader();
                reader.readAsDataURL(image);
                reader.onload = async () => {
                    const base64 = reader.result;
                    const res = await productApi.createNewProduct({
                        ...itemSelected,
                        image_url: base64,
                    });
                    if (res.status === 200) {
                        toast.success('Tạo sản phẩm thành công', {
                            autoClose: 3000,
                        });
                    }
                    setIsOpenModalEdit(false);
                    setItemSelected();
                    setConfirmLoading(false);
                    setPreviewUrl();
                };
            }
        } catch (err) {
            toast.error('Tạo sản phẩm thất bại', {
                autoClose: 3000,
            });
        }
    };

    const handleCancel = () => {
        setIsOpenModalEdit(false);
        setItemSelected(undefined);
    };

    const handleClickProductEdit = useCallback((item) => {
        setTitle('Chỉnh sửa sản phẩm');
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
                title: 'Hành động',
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
                                title="Xóa sản phẩm này"
                                description="Bạn có chắc chắn muốn xóa sản phẩm này không?"
                                okText="Có"
                                cancelText="Không"
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
        setTitle('Tạo sản phẩm mới');
        setItemSelected(DEFAULT_PRODUCT);
        setIsOpenModalEdit(true);
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
                        Tạo sản phẩm mới
                    </button>
                </div>
                <Table dataSource={productList} columns={convertColumns} className="w-full" />
            </div>
            <ProductModal
                title={title}
                handleOk={handleSubmit}
                confirmLoading={confirmLoading}
                handleCancel={handleCancel}
                isOpenModalEdit={isOpenModalEdit}
                itemSelected={itemSelected}
                previewUrl={previewUrl}
                setItemSelected={setItemSelected}
                handleClearImage={handleClearImage}
                handleImageChange={handleImageChange}
                image={image}
            />
            <Loading isLoading={isLoading} />
        </>
    );
};

export default ProductAdmin;
