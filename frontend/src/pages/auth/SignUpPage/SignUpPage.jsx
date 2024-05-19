import styled from 'styled-components';
import { FormGridWrapper, FormTitle } from '~/styles/form_grid';
import { Container } from '~/styles/styles';
import AuthOptions from '~/components/auth/AuthOptions';
import { FormElement, Input } from '~/styles/form';
import PasswordInput from '~/components/auth/PasswordInput';
import { Link } from 'react-router-dom';
import { BaseButtonBlack } from '~/styles/button';
import { defaultTheme } from '~/styles/themes/default';
import images from '~/assets/images';

const SignUpPageWrapper = styled.section`
    form {
        margin-top: 40px;
        .form-elem-text {
            margin-top: -16px;
            display: block;
        }
    }

    .text-space {
        margin: 0 4px;
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

const SignUpPage = () => {
    return (
        <SignUpPageWrapper>
            <FormGridWrapper>
                <Container>
                    <div className="form-grid-content">
                        <div className="form-grid-left">
                            <img src={images.backgroundVertical} alt="" className="form-grid-left-img" />
                        </div>
                        <div className="form-grid-right">
                            <FormTitle>
                                <h3>Đăng ký</h3>
                            </FormTitle>
                            <AuthOptions />
                            <form>
                                <FormElement>
                                    <label htmlFor="" className="forme-elem-label">
                                        Tên người dùng hoặc địa chỉ email
                                    </label>
                                    <Input type="text" placeholder="" name="" className="form-elem-control" />
                                    <span className="form-elem-error">*Vui lòng nhập địa chỉ email hợp lệ.</span>
                                </FormElement>
                                <PasswordInput fieldName="Mật khẩu" name="password" />
                                <PasswordInput fieldName="Nhập lại mật khẩu" name="confirmPassword" />
                                <span className="form-elem-text font-medium">
                                    Sử dụng 8 ký tự trở lên kết hợp chữ cái, số và ký hiệu
                                </span>
                                <BaseButtonBlack type="submit" className="form-submit-btn">
                                    Đăng ký
                                </BaseButtonBlack>
                            </form>
                            <p className="flex flex-wrap account-rel-text">
                                Bạn đã có tài khoản?
                                <Link to="/sign_in" className="font-medium">
                                    Đăng nhập
                                </Link>
                            </p>
                        </div>
                    </div>
                </Container>
            </FormGridWrapper>
        </SignUpPageWrapper>
    );
};

export default SignUpPage;
