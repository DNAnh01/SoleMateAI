import styled from 'styled-components';
import { FormGridWrapper, FormTitle } from '~/styles/form_grid';
import { Container } from '~/styles/styles';
import AuthOptions from '~/components/auth/AuthOptions';
import { FormElement, Input } from '~/styles/form';
import PasswordInput from '~/components/auth/PasswordInput';
import { Link } from 'react-router-dom';
import { BaseButtonBlack } from '~/styles/button';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import images from '~/assets/images';


const SignInPageWrapper = styled.section`
    .form-separator {
        margin: 32px 0;
        column-gap: 18px;

        @media (max-width: ${breakpoints.lg}) {
            margin: 24px 0;
        }

        .separator-text {
            border-radius: 50%;
            min-width: 40px;
            height: 40px;
            background-color: ${defaultTheme.color_purple};
            position: relative;
        }

        .separator-line {
            width: 100%;
            height: 1px;
            background-color: ${defaultTheme.color_platinum};
        }
    }

    .form-elem-text {
        margin-top: -16px;
        display: block;
    }
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

const SignInPage = () => {

    return (
        <SignInPageWrapper>
            <FormGridWrapper>
                <Container className="container">
                    <div className="form-grid-content">
                        <div className="form-grid-left">
                            <img src={images.backgroundVertical} alt="" className="form-grid-left-img" />
                        </div>
                        <div className="form-grid-right">
                            <FormTitle>
                                <h3>Đăng nhập</h3>
                            </FormTitle>
                            <AuthOptions />
                            <div className="form-separator flex items-center justify-center">
                                <span className="separator-line"></span>
                                <span className="separator-text inline-flex items-center justify-center text-white">
                                    Hoặc
                                </span>
                                <span className="separator-line"></span>
                            </div>

                            <form>
                                <FormElement>
                                    <label htmlFor="" className="form-elem-label">
                                        Tên người dùng hoặc địa chỉ email
                                    </label>
                                    <Input type="text" placeholder="" name="" className="form-elem-control" />
                                </FormElement>
                                <PasswordInput fieldName="Mật khẩu" name="password" />
                                <Link to="/reset" className="form-elem-text text-end font-medium">
                                    Quên mật khẩu?
                                </Link>
                                <BaseButtonBlack type="submit" className="form-submit-btn">
                                    Đăng nhập
                                </BaseButtonBlack>
                            </form>
                            <p className="flex flex-wrap account-rel-text">
                                Bạn chưa có tài khoản?
                                <Link to="/sign_up" className="font-medium">
                                    Đăng ký ngay
                                </Link>
                            </p>
                        </div>
                    </div>
                </Container>
            </FormGridWrapper>
        </SignInPageWrapper >
    );
};

export default SignInPage;
