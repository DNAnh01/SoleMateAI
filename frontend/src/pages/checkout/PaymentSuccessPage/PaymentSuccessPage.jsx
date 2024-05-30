import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Container } from '~/styles/styles';
import { BaseLinkGreen } from '~/styles/button';
import images from '~/assets/images';
import configs from '~/configs';
import { currencyFormat } from '~/utils/helper';

const SuccessPageWrapper = styled.main`
    margin: 100px 0;

    .success-img {
        width: 240px;
        overflow: hidden;
    }

    .success-msg {
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

const PaymentSuccessPage = () => {
    const query = useQuery();
    const amount = query.get('vnp_Amount');
    const txnRef = query.get('vnp_TxnRef');
    const transactionNo = query.get('vnp_TransactionNo');

    return (
        <SuccessPageWrapper className="page-py-spacing">
            <Container>
                <div className="flex items-center justify-center flex-col">
                    <div className="success-img">
                        <img src={images.complete} alt="success" className="object-fit-cover" />
                    </div>
                    <div className="success-msg w-full flex flex-col justify-center items-center">
                        <p className="text-4xl text-center font-semibold text-outerspace">Thanh toán thành công 🎉</p>
                        <p className="text-gray italic">Số tiền: {currencyFormat(Number(amount))}</p>
                        <p className="text-gray italic">Mã giao dịch: {txnRef}</p>
                        <p className="text-gray italic">Số giao dịch: {transactionNo}</p>
                        <BaseLinkGreen to={configs.roures.home}>Tiếp tục mua sắm</BaseLinkGreen>
                    </div>
                </div>
            </Container>
        </SuccessPageWrapper>
    );
};

export default PaymentSuccessPage;
