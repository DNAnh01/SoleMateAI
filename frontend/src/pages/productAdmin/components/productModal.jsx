import { InputNumber, Modal, Select, Space, Input } from 'antd';
import { BRAND, STATUS } from '~/data/data.product';
import { MdEdit } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { RiImageAddLine } from 'react-icons/ri';
import useAppStore from '~/store';
const { TextArea } = Input;
const ProductModal = ({
    title,
    handleOk,
    confirmLoading,
    handleCancel,
    isOpenModalEdit,
    formattedColors,
    itemSelected,
    previewUrl,
    handleClearImage,
    handleImageChange,
    image,
}) => {
    const { brands } = useAppStore();
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
                            Brand:
                        </label>
                        <Select
                            id="brand"
                            name="brand"
                            options={brands || BRAND}
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
