import styled from 'styled-components';
import { FormGridWrapper, FormTitle } from '~/styles/form_grid';
import { Container } from '~/styles/styles';
import AuthOptions from '~/components/auth/AuthOptions';
import { FormElement, Input } from '~/styles/form';
import PasswordInput from '~/components/auth/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { BaseButtonBlack } from '~/styles/button';
import { defaultTheme } from '~/styles/themes/default';
import images from '~/assets/images';
import configs from '~/configs';
import authApi from '~/apis/auth.api';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getRules } from '~/utils/rules';
import { toast } from 'react-toastify';

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
`;

const SignUpPage = () => {
    const navigate = useNavigate();
    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            const res = await authApi.signUp({
                email: formik.values.email,
                password: formik.values.password,
            });
            if (res.status === 201) {
                toast.success('Đăng ký thành công', {
                    autoClose: 3000,
                });
                navigate(configs.roures.auth.signIn);
            }
            if (res.status === 400) {
                toast.error('Email đã được sử dụng', {
                    autoClose: 3000,
                });
            }
            if (res.status === 500) {
                toast.error('Có lỗi xảy ra', {
                    autoClose: 3000,
                });
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra', {
                autoClose: 3000,
            });
        }
    };
    const validationSchema = yup.object().shape(getRules());

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: handleSignUp,
    });

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
                            <form onSubmit={handleSignUp}>
                                <FormElement>
                                    <label htmlFor="" className="forme-elem-label">
                                        Tên người dùng hoặc địa chỉ email
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder=""
                                        id="email"
                                        name="email"
                                        className="form-elem-control"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        onBlur={formik.handleBlur}
                                    />

                                    {formik.touched.email && formik.errors.email ? (
                                        <span className="form-elem-error">{formik.errors.email}</span>
                                    ) : null}
                                </FormElement>
                                <PasswordInput
                                    fieldName="Mật khẩu"
                                    name="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    onBlur={formik.handleBlur}
                                    errorMsg={
                                        formik.touched.password && formik.errors.password ? formik.errors.password : ''
                                    }
                                />
                                <PasswordInput
                                    fieldName="Nhập lại mật khẩu"
                                    name="confirmPassword"
                                    onChange={formik.handleChange}
                                    value={formik.values.confirmPassword}
                                    onBlur={formik.handleBlur}
                                    errorMsg={
                                        formik.touched.confirmPassword && formik.errors.confirmPassword
                                            ? formik.errors.confirmPassword
                                            : ''
                                    }
                                />
                                <BaseButtonBlack type="submit" className="form-submit-btn">
                                    Đăng ký
                                </BaseButtonBlack>
                            </form>
                            <p className="flex flex-wrap account-rel-text">
                                Bạn đã có tài khoản?
                                <Link to={configs.roures.auth.signIn} className="font-medium">
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
