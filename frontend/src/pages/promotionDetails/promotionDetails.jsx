import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import promotionApi from '~/apis/promotion.api';
import Loading from '~/components/loading/loading';
import useFetchData from '~/hooks/useFetchData';

const PromotionDetails = () => {
    const { id } = useParams();
    const { data, loading } = useFetchData(() => promotionApi.getPromotionById(id));
    const [promotion, setPromotion] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(loading);
        if (data) {
            setPromotion(data);
            setIsLoading(false);
        }
    }, [data, loading]);

    return (
        <>
            <div>
                <h1>{JSON.stringify(promotion)}</h1>
            </div>
            <Loading isLoading={isLoading} />
        </>
    );
};

export default PromotionDetails;
