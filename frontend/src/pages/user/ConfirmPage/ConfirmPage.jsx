import styled from 'styled-components';
import { Container } from '~/styles/styles';
import { BaseLinkGreen, BaseLinkOutlineDark } from '~/styles/button';
import { defaultTheme } from '~/styles/themes/default';
import configs from '~/configs';
import images from '~/assets/images';

const ConfirmPageWrapper = styled.main`
    margin: 24px 0;

    .confirm-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 16px;
    }

    .confirm-img {
        width: 240px;
        overflow: hidden;
        img {
            width: 100%;
            height: auto;
            object-fit: cover;
            transition: transform 0.3s ease-in-out;
        }
        img:hover {
            transform: scale(1.1);
        }
    }

    .confirm-msg {
        border: 2px solid ${defaultTheme.color_outerspace};
        border-radius: 6px;
        padding: 24px;
        margin-top: 16px;
        max-width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        background-color: ${defaultTheme.color_background};
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    p {
        font-size: 1.5rem;
        font-weight: 600;
        color: ${defaultTheme.color_outerspace};
        margin-bottom: 16px;
    }
`;

const ConfirmPage = () => {
    return (
        <ConfirmPageWrapper className="page-py-spacing">
            <Container>
                <div className="confirm-content">
                    <div className="confirm-img">
                        <img src={images.confirmedImg} alt="Confirmed" />
                    </div>
                    <div className="confirm-msg">
                        <p>Đơn hàng của bạn đã được xác nhận.</p>
                        <BaseLinkGreen to={configs.roures.home}>Tiếp tục mua sắm</BaseLinkGreen>
                        <BaseLinkOutlineDark to={configs.roures.user.order}>Xem đơn hàng</BaseLinkOutlineDark>
                    </div>
                </div>
            </Container>
        </ConfirmPageWrapper>
    );
};

export default ConfirmPage;
