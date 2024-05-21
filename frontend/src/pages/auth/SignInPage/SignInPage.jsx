import styled from 'styled-components';
import { FormGridWrapper, FormTitle } from '~/styles/form_grid';
import { Container } from '~/styles/styles';
import AuthOptions from '~/components/auth/AuthOptions';
import { FormElement, Input } from '~/styles/form';
import PasswordInput from '~/components/auth/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { BaseButtonBlack } from '~/styles/button';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import images from '~/assets/images';
import configs from '~/configs';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import authApi from '~/apis/auth.api';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getRules } from '~/utils/rules';
import { AppContext } from '~/contexts/app.context';
import { clearLocalStorage, setAccessTokenToLocalStorage, setProfileToLocalStorage } from '~/utils/auth';

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

const SignInPage = () => {
    const { setIsAuthenticated, setProfile, setRole } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            const res = await authApi.signIn({
                email: formik.values.email,
                password: formik.values.password,
            });
            if (res.status === 200) {
                toast.success('Đăng nhập thành công', {
                    autoClose: 3000,
                });
                clearLocalStorage();
                setAccessTokenToLocalStorage(res.data.access_token);
                setProfileToLocalStorage(res.data.user);
                setIsAuthenticated(true);
                setProfile(res.data.user);
                setRole(res.data.user.role_name);
                navigate(configs.roures.home);
                // window.location.reload();
            }
            if (res.status === 404) {
                setIsAuthenticated(false);
                setProfile(null);
                setRole('user');
                toast.error('Email không tồn tại', {
                    autoClose: 3000,
                });
            }
            if (res.status === 400) {
                setIsAuthenticated(false);
                setProfile(null);
                setRole('user');
                toast.error('Mật khẩu không đúng', {
                    autoClose: 3000,
                });
            }
        } catch (error) {
            setIsAuthenticated(false);
            setProfile(null);
            setRole('user');
            toast.error('Đăng nhập thất bại', {
                autoClose: 3000,
            });
        }
    };
    const validationSchema = yup.object().shape(getRules());
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: handleSignIn,
    });
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

                            <form onSubmit={handleSignIn}>
                                <FormElement>
                                    <label htmlFor="" className="form-elem-label">
                                        Tên người dùng hoặc địa chỉ email
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
                                <Link
                                    to={configs.roures.auth.forgetPassword}
                                    className="form-elem-text text-end font-medium"
                                >
                                    Quên mật khẩu?
                                </Link>
                                <BaseButtonBlack type="submit" className="form-submit-btn">
                                    Đăng nhập
                                </BaseButtonBlack>
                            </form>
                            <p className="flex flex-wrap account-rel-text">
                                Bạn chưa có tài khoản?
                                <Link to={configs.roures.auth.signUp} className="font-medium">
                                    Đăng ký ngay
                                </Link>
                            </p>
                        </div>
                    </div>
                </Container>
            </FormGridWrapper>
        </SignInPageWrapper>
    );
};

export default SignInPage;
