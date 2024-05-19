import styled from 'styled-components';
import { FormGridWrapper, FormTitle } from '~/styles/form_grid';
import { Container } from '~/styles/styles';
import { FormElement, Input } from '~/styles/form';
import { BaseButtonBlack } from '~/styles/button';
import { Link } from 'react-router-dom';
import { defaultTheme } from '~/styles/themes/default';
import images from '~/assets/images';

const ResetPageWrapper = styled.section`

    .form-grid-left {
        display:  flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(to top right, ${defaultTheme.color_yellow_green}, ${defaultTheme.color_purple});
    }
    .form-grid-left-img {
        position: absolute;
        object-fit: cover;
        height: 100%;
        width: auto;
    }
`;

const ResetPage = () => {
    return (
        <ResetPageWrapper>
            <FormGridWrapper>
                <Container>
                    <div className="form-grid-content">
                        <div className="form-grid-left">
                            <img src={images.backgroundVertical} alt="" className="form-grid-left-img" />
                        </div>
                        <div className="form-grid-right">
                            <FormTitle>
                                <h3>Đặt lại mật khẩu của bạn</h3>
                                <p>Nhập email của bạn và chúng tôi sẽ gửi cho bạn một mật khẩu mới để đặt lại mật khẩu của bạn.</p>
                            </FormTitle>

                            <form>
                                <FormElement>
                                    <label htmlFor="" className="form-elem-label">
                                        Email
                                    </label>
                                    <Input type="text" placeholder="" name="" className="form-elem-control" />
                                </FormElement>
                                <BaseButtonBlack type="submit" className="form-submit-btn">
                                    Gửi
                                </BaseButtonBlack>
                            </form>
                            <p className="flex flex-wrap account-rel-text">
                                <Link to="/sign_in" className="font-medium">
                                    Quay lại đăng nhập
                                </Link>
                            </p>
                        </div>
                    </div>
                </Container>
            </FormGridWrapper>
        </ResetPageWrapper>
    );
};

export default ResetPage;
