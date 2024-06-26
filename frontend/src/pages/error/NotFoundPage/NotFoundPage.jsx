import styled from 'styled-components';
import { Container } from '~/styles/styles';
import { staticImages } from '~/utils/images';
import { BaseLinkGreen } from '~/styles/button';

const NotFoundPageWrapper = styled.main`
    margin: 24px 0;
    .page-not-found-img {
        width: 240px;
        overflow: hidden;
    }
    .page-not-found-msg {
        border-radius: 6px;
        padding: 24px 0;
        margin-top: 16px;
        max-width: 400px;
        gap: 12px;
    }
`;

const NotFoundPage = () => {
    return (
        <NotFoundPageWrapper className="page-py-spacing">
            <Container>
                <div className="flex items-center justify-center flex-col">
                    <div className="page-not-found-img flex items-center justify-center">
                        <img src={staticImages.page_not_found} alt="" className="object-fit-cover" />
                    </div>
                    <div className="page-not-found-msg w-full flex flex-col justify-center items-center">
                        <p className="text-4xl font-semibold text-outerspace">Ối! Không tìm thấy trang.</p>
                        <p className="text-gray text-center">
                            Trang bạn đang tìm kiếm có thể đã bị xóa hoặc tạm thời không có.
                        </p>
                        <BaseLinkGreen to="/">Quay lại trang chủ.</BaseLinkGreen>
                    </div>
                </div>
            </Container>
        </NotFoundPageWrapper>
    );
};

export default NotFoundPage;
