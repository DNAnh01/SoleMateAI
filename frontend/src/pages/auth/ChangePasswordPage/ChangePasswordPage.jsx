import styled from 'styled-components';
import { FormGridWrapper, FormTitle } from '~/styles/form_grid';
import { Container } from '~/styles/styles';
import PasswordInput from '~/components/auth/PasswordInput';
import { BaseButtonBlack } from '~/styles/button';
import { defaultTheme } from '~/styles/themes/default';
import images from '~/assets/images';

const ChangePwdScreenWrapper = styled.section`
    .form-grid-left {
        display: flex;
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
    .loading-icon {
        margin-top: 8px;
        animation: spinner 0.8s linear infinite;
    }
    @keyframes spinner {
        from {
            transform: translateY(-50%) rotate(0);
        }
        to {
            transform: translateY(-50%) rotate(360deg);
        }
    }
`;

const ChangePasswordPage = () => {
    return (
        <ChangePwdScreenWrapper>
            <FormGridWrapper>
                <Container>
                    <div className="form-grid-content">
                        <div className="form-grid-left">
                            <img src={images.backgroundVertical} alt="" className="form-grid-left-img" />
                        </div>
                        <div className="form-grid-right">
                            <FormTitle>
                                <h3>Tạo mật khẩu mới</h3>
                                <p>Mật khẩu mới của bạn phải khác với mật khẩu đã sử dụng trước đó.</p>
                            </FormTitle>
                            <form>
                                <PasswordInput fieldName="Mật khẩu" name="password" />
                                <PasswordInput
                                    fieldName="Nhập lại mật khẩu"
                                    name="confirm_password"
                                    errorMsg="Mật khẩu mới và mật khẩu xác nhận không khớp"
                                />
                                <BaseButtonBlack type="submit" className="form-submit-btn">
                                    Đặt lại mật khẩu
                                </BaseButtonBlack>
                            </form>
                        </div>
                    </div>
                </Container>
            </FormGridWrapper>
        </ChangePwdScreenWrapper>
    );
};

export default ChangePasswordPage;
