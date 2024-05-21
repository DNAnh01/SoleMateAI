import { Table, Modal, Select, Space, Input, InputNumber, Popconfirm } from 'antd';
import { BRAND, STATUS, columns, dataSource } from '~/data/data.product';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { colors } from '~/utils/common';
const { TextArea } = Input;

const formattedColors = colors.map((color) => ({
    value: color,
    label: color,
}));

const ProductAdmin = () => {
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [itemSelected, setItemSelected] = useState();
    const timeoutRef = useRef();
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
        setItemSelected(item);
        setIsOpenModalEdit(true);
    }, []);

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
    }, [handleClickProductEdit]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    return (
        <>
            <div className="p-2">
                <Table dataSource={dataSource} columns={convertColumns} className="w-full" />
            </div>
            <Modal
                title="Edit Product"
                open={isOpenModalEdit}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                className="min-w-[1000px]"
            >
                <div className="max-h-[420px] flex flex-col gap-4 overflow-y-auto min-h-[400px] py-4">
                    <div className="flex">
                        <div className="flex items-center gap-2 w-[30%]">
                            <label className="font-semibold w-[30%]" htmlFor="brand">
                                Brand:
                            </label>
                            <Select
                                id="brand"
                                name="brand"
                                options={BRAND}
                                className="w-[100px]"
                                value={BRAND[0].value}
                            />
                        </div>
                        <div className="flex items-center gap-2 w-[30%]">
                            <label className="font-semibold w-[30%]" htmlFor="color">
                                Color:
                            </label>
                            <Select
                                id="color"
                                name="color"
                                options={formattedColors}
                                className="w-[100px]"
                                value={formattedColors[0].value}
                                optionRender={(option) => (
                                    <Space>
                                        <span
                                            className="w-[10px] h-[10px] rounded-full inline-block"
                                            style={{
                                                backgroundColor: option.value,
                                            }}
                                        ></span>
                                    </Space>
                                )}
                            />
                        </div>
                        <div className="flex items-center gap-2 w-[30%]">
                            <label className="font-semibold w-[30%]" htmlFor="active">
                                Status:
                            </label>
                            <Select
                                id="active"
                                name="active"
                                options={STATUS}
                                className="w-[100px]"
                                value={STATUS[0].value}
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex items-center gap-2 w-[30%]">
                            <label className="font-semibold w-[30%]" htmlFor="quantity">
                                Quantity:
                            </label>
                            <InputNumber id="quantity" className="w-[100px]" min={1} max={1000} defaultValue={3} />
                        </div>
                        <div className="flex items-center gap-2 w-[30%]">
                            <label className="font-semibold w-[30%]" htmlFor="displayPrice">
                                Display:
                            </label>
                            <InputNumber id="displayPrice" className="w-[100px]" min={1} max={1000} defaultValue={3} />
                        </div>
                        <div className="flex items-center gap-2 w-[30%]">
                            <label className="font-semibold w-[30%]" htmlFor="warehouse">
                                Warehouse:
                            </label>
                            <InputNumber id="warehouse" className="w-[100px]" min={1} max={1000} defaultValue={3} />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 w-[30%]">
                            <label className="font-semibold w-[30%]" htmlFor="discount">
                                Discount:
                            </label>
                            <InputNumber id="discount" className="w-[100px]" min={1} max={100} defaultValue={3} />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-3/5">
                            <label className="font-semibold" htmlFor="description">
                                Description:
                            </label>
                            <TextArea
                                id="description"
                                name="description"
                                type="text"
                                value={itemSelected?.description}
                                rows={4}
                                className="mt-1"
                            />
                        </div>
                        <div className="w-2/5 pl-4">
                            <img
                                src={itemSelected?.image}
                                alt={itemSelected?.name}
                                className="w-full max-h-[250px] object-cover rounded-xl"
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ProductAdmin;
