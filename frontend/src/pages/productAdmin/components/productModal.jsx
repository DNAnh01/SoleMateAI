import { InputNumber, Modal, Select, Space, Input } from 'antd';
import { BRAND, STATUS } from '~/data/data.product';
import { MdEdit } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { RiImageAddLine } from 'react-icons/ri';
import useAppStore from '~/store';
import { useEffect, useState } from 'react';
const { TextArea } = Input;

const ProductModal = ({
    title,
    handleOk,
    confirmLoading,
    handleCancel,
    isOpenModalEdit,
    itemSelected,
    previewUrl,
    handleClearImage,
    handleImageChange,
    image,
    setItemSelected,
}) => {
    const { brands, colors } = useAppStore();
    const [brand, setBrand] = useState(brands[0]);
    const [listColor, setListColor] = useState([]);
    const [color, setColor] = useState();

    const handleChangeSelect = (value, name) => {
        if (name === 'brand') {
            setBrand(value);
            const brandData = brands.find((brand) => brand.label === value);
            setItemSelected((pre) => ({
                ...pre,
                [name]: {
                    brand_name: value,
                    brand_logo: brandData.logo,
                },
            }));
            return;
        }
        if (name === 'is_active') {
            setItemSelected((pre) => ({
                ...pre,
                is_active: value === STATUS[0].value,
            }));
            return;
        }
        if (name === 'color' && listColor) {
            setColor(value);
            const colorData = listColor.find((color) => color.value === value);
            setItemSelected((pre) => ({
                ...pre,
                [name]: {
                    color_name: colorData.label,
                    hex_value: value,
                },
            }));
        }
    };

    const handeChangeNumber = (value, name) => {
        if (name === 'size') {
            setItemSelected((pre) => ({
                ...pre,
                size: {
                    size_number: value,
                },
            }));
            return;
        }
        setItemSelected((pre) => ({
            ...pre,
            [name]: value,
        }));
    };

    const handleChange = (e) => {
        setItemSelected((pre) => ({
            ...pre,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        if (isOpenModalEdit) {
            const initBrand = itemSelected
                ? brands.filter((brand) => brand.label === itemSelected?.brand?.brand_name)[0]
                : brands[0];
            setBrand(initBrand);
        }
    }, [brands, isOpenModalEdit, itemSelected]);

    useEffect(() => {
        if (colors) {
            const temp = colors.map((item) => ({
                value: item.hex_value,
                label: item.label,
            }));
            setListColor(temp);
        }
    }, [colors]);

    return (
        <Modal
            title={title}
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
                            Thương hiệu:
                        </label>
                        <Select
                            id="brand"
                            name="brand"
                            onChange={(e) => handleChangeSelect(e, 'brand')}
                            options={brands || BRAND}
                            className="w-[100px]"
                            value={brand?.label}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-[30%]">
                        <label className="font-semibold w-[30%]" htmlFor="color">
                            Màu sắc:
                        </label>
                        <Select
                            id="color"
                            name="color"
                            options={listColor}
                            value={color}
                            onChange={(e) => handleChangeSelect(e, 'color')}
                            className="w-[100px]"
                            optionRender={(option) => (
                                <Space>
                                    <span
                                        className="w-[10px] h-[10px] rounded-full inline-block"
                                        style={{
                                            backgroundColor: option.value,
                                        }}
                                    ></span>
                                    <span>{option.label}</span>
                                </Space>
                            )}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-[30%]">
                        <label className="font-semibold w-[30%]" htmlFor="active">
                            Trạng thái:
                        </label>
                        <Select
                            id="active"
                            name="is_active"
                            options={STATUS}
                            onChange={(e) => handleChangeSelect(e, 'is_active')}
                            className="w-[100px]"
                            value={STATUS[0].value}
                        />
                    </div>
                </div>
                <div className="flex">
                    <div className="flex items-center gap-2 w-[30%]">
                        <label className="font-semibold w-[30%]" htmlFor="quantity">
                            Số lượng:
                        </label>
                        <InputNumber
                            onChange={(value) => handeChangeNumber(value, 'quantity_in_stock')}
                            id="quantity"
                            className="w-[100px]"
                            min={1}
                            value={itemSelected?.quantity_in_stock}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-[30%]">
                        <label className="font-semibold w-[30%]" htmlFor="displayPrice">
                            Giá bán:
                        </label>
                        <InputNumber
                            onChange={(value) => handeChangeNumber(value, 'display_price')}
                            id="displayPrice"
                            className="w-[100px]"
                            min={1}
                            value={itemSelected?.display_price}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-[30%]">
                        <label className="font-semibold w-[30%]" htmlFor="warehouse">
                            Giá kho:
                        </label>
                        <InputNumber
                            onChange={(value) => handeChangeNumber(value, 'warehouse_price')}
                            id="warehouse"
                            className="w-[100px]"
                            min={1}
                            value={itemSelected?.warehouse_price}
                        />
                    </div>
                </div>
                <div className="flex">
                    <div className="flex items-center gap-2 w-[30%]">
                        <label className="font-semibold w-[30%]" htmlFor="discount">
                            Giảm giá:
                        </label>
                        <InputNumber
                            onChange={(value) => handeChangeNumber(value, 'discounted_price')}
                            id="discount"
                            className="w-[100px]"
                            min={1}
                            value={itemSelected?.discounted_price}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-[30%]">
                        <label className="font-semibold w-[30%]" htmlFor="size">
                            Size:
                        </label>
                        <InputNumber
                            onChange={(value) => handeChangeNumber(value, 'size')}
                            id="size"
                            className="w-[100px]"
                            min={1}
                            value={itemSelected?.size?.size_number}
                        />
                    </div>
                </div>
                <div>
                    <div className="w-3/5">
                        <label className="font-semibold" htmlFor="shoe_name">
                            Tên:
                        </label>
                        <Input
                            value={itemSelected?.shoe_name}
                            name="shoe_name"
                            id="shoe_name"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex">
                    <div className="w-3/5">
                        <label className="font-semibold" htmlFor="description">
                            Mô tả:
                        </label>
                        <TextArea
                            id="description"
                            name="description"
                            type="text"
                            onChange={handleChange}
                            value={itemSelected?.description}
                            rows={4}
                            className="mt-1"
                        />
                    </div>
                    <div className="w-2/5 pl-4 relative">
                        <img
                            src={previewUrl ? previewUrl : itemSelected?.image_url}
                            alt={itemSelected?.name}
                            className="w-full max-h-[200px] object-contain rounded-xl"
                        />

                        {image ? (
                            <button
                                onClick={handleClearImage}
                                className="absolute top-4 cursor-poiter right-4 p-1 rounded-full hover:bg-slate-300"
                            >
                                <IoClose fontSize={20} />
                            </button>
                        ) : itemSelected?.image_url ? (
                            <label
                                htmlFor="product-image"
                                className="absolute top-4 cursor-poiter right-4 p-1 rounded-full hover:bg-slate-300"
                            >
                                <MdEdit fontSize={20} />
                            </label>
                        ) : (
                            <label
                                htmlFor="product-image"
                                className="absolute flex justify-center items-center top-2 cursor-poiter right-2 bottom-0 left-2  p-1 rounded-lg border border-slate-300"
                            >
                                <RiImageAddLine fontSize={60} />
                            </label>
                        )}

                        <input
                            onChange={handleImageChange}
                            type="file"
                            id="product-image"
                            className="hidden"
                            name="image"
                            accept="image/png, image/gif, image/jpeg"
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};
export default ProductModal;
