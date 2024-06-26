import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import promotionApi from '~/apis/promotion.api';
import Loading from '~/components/loading/loading';
import { dateFormat } from '~/data/data.promotion';
import { DatePicker, Input, InputNumber } from 'antd';
import dayjs from 'dayjs';
import ProductSelect from '~/components/productSelect/ProductSelect';
import { AppContext } from '~/contexts/app.context';
import { convertToTargetTimestamp } from '~/utils/common';
import toast from 'react-hot-toast';

const PromotionDetails = () => {
    const { id } = useParams();
    const [promotion, setPromotion] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [productChoosed, setProductsChoosed] = useState([]);

    const { products } = useContext(AppContext);

    const handleChooseProduct = useCallback((item) => {
        setProductsChoosed((prev) => [item, ...prev]);
    }, []);

    const handleRemoveProduct = useCallback((item) => {
        setProductsChoosed((prev) => prev.filter((product) => product?.id !== item?.id));
    }, []);

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const data = {
                promotion_name: promotion?.promotion_name,
                start_date: convertToTargetTimestamp(promotion?.start_date),
                end_date: convertToTargetTimestamp(promotion?.end_date),
                discount_percent: promotion?.discount_percent,
                shoe_ids: productChoosed.map((item) => item?.id),
            };
            const res = await promotionApi.update(promotion?.id, data);
            if (res.status === 200) {
                toast.success('Cập nhật khuyến mãi thành công.');
            }
        } catch (_) {
            toast.error('Cập nhật khuyến mãi thất bại.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (_, dateString, name) => {
        setPromotion({
            ...promotion,
            [name]: dateString,
        });
    };

    const handleChangeNumber = (value) => {
        setPromotion({
            ...promotion,
            discount_percent: value,
        });
    };
    const handleChangeName = (e) => {
        setPromotion({
            ...promotion,
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

    useEffect(() => {
        const fetchData = async (id) => {
            try {
                setIsLoading(true);
                const res = await promotionApi.getPromotionById(id);
                setPromotion(res.data);
                setProductsChoosed(res.data?.shoes);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        if (id) {
            fetchData(id);
        }
    }, [id]);

    return (
        <>
            <div className="p-2">
                <Input value={promotion?.promotion_name} onChange={handleChangeName} />
                <div>
                    <div className="flex gap-8 mt-6">
                        <div className="flex items-center gap-4">
                            <label htmlFor="start_date">Ngày bắt đầu:</label>
                            <DatePicker
                                id="start_date"
                                name="start_date"
                                value={dayjs(promotion?.start_date, dateFormat)}
                                format={dateFormat}
                                onChange={(date, dateString) => handleChange(date, dateString, 'start_date')}
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <label htmlFor="end_date">Ngày kết thúc:</label>
                            <DatePicker
                                id="end_date"
                                name="end_date"
                                value={dayjs(promotion?.end_date, dateFormat)}
                                format={dateFormat}
                                onChange={(date, dateString) => handleChange(date, dateString, 'end_date')}
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <label htmlFor="discount_percent">Khuyến mại:</label>
                            <InputNumber
                                id="discount_percent"
                                name="discount_percent"
                                min={0}
                                value={promotion?.discount_percent}
                                onChange={handleChangeNumber}
                            />
                        </div>
                    </div>
                    {renderListProduct}
                </div>
                <div className="flex justify-end gap-4 mt-10">
                    <button
                        onClick={handleSubmit}
                        className="px-10 py-2 rounded-lg bg-sky-500 hover:bg-sky-700 text-white font-semibold"
                    >
                        Lưu dữ liệu
                    </button>
                </div>
            </div>
            <Loading isLoading={isLoading} />
        </>
    );
};

export default PromotionDetails;
