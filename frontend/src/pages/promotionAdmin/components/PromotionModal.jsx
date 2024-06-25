import dayjs from 'dayjs';
import { useCallback, useContext, useMemo } from 'react';
import ProductSelect from '~/components/productSelect/ProductSelect';
import { AppContext } from '~/contexts/app.context';
import { dateFormat } from '~/data/data.promotion';

const { Modal, Input, DatePicker, InputNumber } = require('antd');

const PromotionModal = ({
    isOpenModal,
    handleOk,
    confirmLoading,
    handleCancel,
    dataPromotionForm,
    setDataPromotionForm,
    productChoosed,
    setProductsChoosed,
}) => {
    const { products } = useContext(AppContext);
    const handleChange = (_, dateString, name) => {
        // console.log(name, dateString);
        setDataPromotionForm({
            ...dataPromotionForm,
            [name]: dateString,
        });
    };
    const handleChangeNumber = (value) => {
        setDataPromotionForm({
            ...dataPromotionForm,
            discount_percent: value,
        });
    };

    const handleChooseProduct = useCallback((item) => {
        setProductsChoosed((prev) => [item, ...prev]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRemoveProduct = useCallback((item) => {
        setProductsChoosed((prev) => prev.filter((product) => product?.id !== item?.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChangeName = (e) => {
        setDataPromotionForm({
            ...dataPromotionForm,
            promotion_name: e.target.value,
        });
    };

    const renderListProduct = useMemo(() => {
        if (products.length > 0) {
            const idsInA = new Set(productChoosed.map((item) => item?.id));
            const filteredProducts = products.filter((item) => !idsInA.has(item?.id));
            return (
                <div className="flex gap-6 mt-6">
                    <div className="flex-1">
                        <h2>Tổng số sản phẩm: {filteredProducts.length}</h2>
                        <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto p-2 rounded-lg border">
                            {filteredProducts.map((item, index) => {
                                return (
                                    <ProductSelect
                                        data={item}
                                        key={index}
                                        mode={'choosed'}
                                        onClickButton={() => handleChooseProduct(item)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex-1 ">
                        <h2>Tổng số sản phẩm được áp dụng giảm giá: {productChoosed.length}</h2>
                        <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto p-2 rounded-lg border">
                            {productChoosed?.map((item, index) => {
                                return (
                                    <ProductSelect
                                        data={item}
                                        key={index}
                                        mode={'select'}
                                        onClickButton={() => handleRemoveProduct(item)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }
    }, [handleChooseProduct, handleRemoveProduct, productChoosed, products]);

    return (
        <Modal
            title={'Tạo mới khuyến mại'}
            open={isOpenModal}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            className="min-w-[1000px]"
        >
            <div className="max-h-[520px] flex flex-col gap-4 overflow-y-auto min-h-[400px] py-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="promotion_name" className="font-semibold">
                        Tên khuyến mại:
                    </label>
                    <Input
                        id="promotion_name"
                        onChange={handleChangeName}
                        placeholder="Tên khuyến mại"
                        value={dataPromotionForm.promotion_name}
                    />
                </div>
                <div className="flex items-center gap-16">
                    <div className="flex gap-2 items-center">
                        <label htmlFor="start_date">Ngày bắt đầu:</label>
                        <DatePicker
                            id="start_date"
                            name="start_date"
                            value={dayjs(dataPromotionForm?.start_date, dateFormat)}
                            format={dateFormat}
                            onChange={(date, dateString) => handleChange(date, dateString, 'start_date')}
                        />
                    </div>
                    <div className="flex gap-2 items-center">
                        <label htmlFor="end_date">Ngày kết thúc:</label>
                        <DatePicker
                            id="end_date"
                            name="end_date"
                            value={dayjs(dataPromotionForm?.end_date, dateFormat)}
                            format={dateFormat}
                            onChange={(date, dateString) => handleChange(date, dateString, 'end_date')}
                        />
                    </div>
                    <div className="flex gap-2 items-center">
                        <label htmlFor="discount_percent">Khuyến mại:</label>
                        <InputNumber
                            id="discount_percent"
                            name="discount_percent"
                            min={0}
                            value={dataPromotionForm?.discount_percent}
                            onChange={handleChangeNumber}
                        />
                    </div>
                </div>
                <div className="h-full">{renderListProduct}</div>
            </div>
        </Modal>
    );
};

export default PromotionModal;
