import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import promotionApi from '~/apis/promotion.api';
import Loading from '~/components/loading/loading';
import { promotionColumns } from '~/data/data.promotion';
import useFetchData from '~/hooks/useFetchData';

const PromotionAdmin = () => {
    const [promotionList, setPromotionList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const { data } = useFetchData(promotionApi.getAllPromotion);
    useEffect(() => {
        setIsLoading(true);
        if (data) {
            setPromotionList(data);
            setIsLoading(false);
        }
    }, [data]);
    return (
        <>
            <div>
                <Table
                    columns={promotionColumns}
                    dataSource={promotionList}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                navigate(`/admin/promotion/${record.id}`);
                            },
                        };
                    }}
                />
            </div>
            <Loading isLoading={isLoading} />
        </>
    );
};

export default PromotionAdmin;
