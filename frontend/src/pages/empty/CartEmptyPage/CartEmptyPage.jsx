import styled from 'styled-components';
import { Container } from '~/styles/styles';
import { BaseLinkGreen } from '~/styles/button';
import images from '~/assets/images';
import configs from '~/configs';

const CartEmptyPageWrapper = styled.main`
    margin: 100px 0;

    .empty-cart-img {
        width: 240px;
        overflow: hidden;
    }

    .empty-cart-msg {
        border-radius: 6px;
        padding: 24px 0;
        margin-top: 16px;
        max-width: 400px;
        gap: 12px;
    }
`;

const CartEmptyPage = () => {
    return (
        <CartEmptyPageWrapper className="page-py-spacing">
            <Container>
                <div className="flex items-center justify-center flex-col">
                    <div className="empty-cart-img">
                        <img src={images.emptyCartImage} alt="" className="object-fit-cover" />
                    </div>
                    <div className="empty-cart-msg w-full flex flex-col justify-center items-center">
                        <p className="text-4xl text-center font-semibold text-outerspace">
                            Giỏ hàng của bạn trống rỗng 🧐
                        </p>
                        <p className="text-gray italic">Vui lòng chọn giày và thêm vào giõ hàng!</p>
                        <BaseLinkGreen to={configs.roures.home}>Tiếp tục mua sắm</BaseLinkGreen>
                    </div>
                </div>
            </Container>
        </CartEmptyPageWrapper>
    );
};

export default CartEmptyPage;
