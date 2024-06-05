import styled from 'styled-components';
import { FormGridWrapper, FormTitle } from '~/styles/form_grid';
import { Container } from '~/styles/styles';
import PasswordInput from '~/components/auth/PasswordInput';
import { BaseButtonBlack } from '~/styles/button';
import { defaultTheme } from '~/styles/themes/default';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getRules } from '~/utils/rules';
import images from '~/assets/images';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '~/apis/auth.api';
import configs from '~/configs';
import useAppStore from '~/store';
import { toast } from 'react-toastify';
import Icons from '~/components/common/Icons/Icons';

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
    const { clearLocalStorage } = useAppStore();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChangePassword = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const res = await authApi.changePassword({
                passwordOld: formik.values.password_old,
                passwordNew: formik.values.password_new,
            });
            console.log('handleChangePassword', res.data);
            if (res.status === 200) {
                toast.success('Đổi mật khẩu thành công');
                clearLocalStorage();
                navigate(configs.roures.auth.signIn);
            }
        } catch (error) {
            toast.error('Đổi mật khẩu thất bại');
        } finally {
            setIsLoading(false);
        }
    };

    const validationSchema = yup.object().shape(getRules());

    const formik = useFormik({
        initialValues: {
            password_old: '',
            password_new: '',
            confirm_password_new: '',
        },
        validationSchema: validationSchema,
        onSubmit: handleChangePassword,
    });

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
                            <form onSubmit={handleChangePassword}>
                                <PasswordInput
                                    fieldName="Mật khẩu cũ"
                                    name="password_old"
                                    onChange={formik.handleChange}
                                    value={formik.values.password_old}
                                    onBlur={formik.handleBlur}
                                    errorMsg={
                                        formik.touched.password_old && formik.errors.password_old
                                            ? formik.errors.password_old
                                            : ''
                                    }
                                />
                                <PasswordInput
                                    fieldName="Mật khẩu mới"
                                    name="password_new"
                                    onChange={formik.handleChange}
                                    value={formik.values.password_new}
                                    onBlur={formik.handleBlur}
                                    errorMsg={
                                        formik.touched.password_new && formik.errors.password_new
                                            ? formik.errors.password_new
                                            : ''
                                    }
                                />
                                <PasswordInput
                                    fieldName="Nhập lại mật khẩu mới"
                                    name="confirm_password_new"
                                    onChange={formik.handleChange}
                                    value={formik.values.confirm_password_new}
                                    onBlur={formik.handleBlur}
                                    errorMsg={
                                        formik.touched.confirm_password_new && formik.errors.confirm_password_new
                                            ? formik.errors.confirm_password_new
                                            : ''
                                    }
                                />
                                <BaseButtonBlack type="submit" className="form-submit-btn">
                                    {isLoading ? (
                                        <Icons
                                            icon="loading"
                                            className="loading-icon"
                                            width={16}
                                            height={16}
                                            color={defaultTheme.color_white}
                                        />
                                    ) : (
                                        'Đặt lại mật khẩu'
                                    )}
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
