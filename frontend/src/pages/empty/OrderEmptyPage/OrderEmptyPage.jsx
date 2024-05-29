import styled from 'styled-components';
import { Container } from '~/styles/styles';
import { BaseLinkGreen } from '~/styles/button';
import images from '~/assets/images';
import configs from '~/configs';

const OrderEmptyPageWrapper = styled.main`
    margin: 100px 0;

    .empty-order-img {
        width: 240px;
        overflow: hidden;
    }

    .empty-order-msg {
        border-radius: 6px;
        padding: 24px 0;
        margin-top: 16px;
        max-width: 400px;
        gap: 12px;
    }
`;

const OrderEmptyPage = () => {
    return (
        <OrderEmptyPageWrapper className="page-py-spacing">
            <Container>
                <div className="flex items-center justify-center flex-col">
                    <div className="empty-order-img">
                        <img src={images.emptyOrder} alt="" className="object-fit-cover" />
                    </div>
                    <div className="empty-order-msg w-full flex flex-col justify-center items-center">
                        <p className="text-4xl text-center font-semibold text-outerspace">
                            Bạn chưa có đơn hàng nào 🧐
                        </p>
                        <p className="text-gray italic">Vui lòng chọn sản phẩm và đặt hàng!</p>
                        <BaseLinkGreen to={configs.roures.home}>Tiếp tục mua sắm</BaseLinkGreen>
                    </div>
                </div>
            </Container>
        </OrderEmptyPageWrapper>
    );
};

export default OrderEmptyPage;
