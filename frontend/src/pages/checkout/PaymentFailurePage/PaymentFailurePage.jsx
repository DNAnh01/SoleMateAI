import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Container } from '~/styles/styles';
import { BaseLinkGreen } from '~/styles/button';
import images from '~/assets/images';
import configs from '~/configs';
import { currencyFormat } from '~/utils/helper';

const FailurePageWrapper = styled.main`
    margin: 100px 0;

    .failure-img {
        width: 240px;
        overflow: hidden;
    }

    .failure-msg {
        border-radius: 6px;
        padding: 24px 0;
        margin-top: 16px;
        max-width: 400px;
        gap: 12px;
    }
`;

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const PaymentFailurePage = () => {
    const query = useQuery();
    const amount = query.get('vnp_Amount');
    const txnRef = query.get('vnp_TxnRef');

    return (
        <FailurePageWrapper className="page-py-spacing">
            <Container>
                <div className="flex items-center justify-center flex-col">
                    <div className="failure-img">
                        <img src={images.fail} alt="failure" className="object-fit-cover" />
                    </div>
                    <div className="failure-msg w-full flex flex-col justify-center items-center">
                        <p className="text-4xl text-center font-semibold text-outerspace">Thanh toán thất bại 😢</p>
                        <p className="text-gray italic">Số tiền: {currencyFormat(Number(amount))}</p>
                        <p className="text-gray italic">Mã giao dịch: {txnRef}</p>
                        <BaseLinkGreen to={configs.roures.home}>Thử lại</BaseLinkGreen>
                    </div>
                </div>
            </Container>
        </FailurePageWrapper>
    );
};

export default PaymentFailurePage;
