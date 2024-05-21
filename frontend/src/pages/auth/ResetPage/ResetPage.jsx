import styled from 'styled-components';
import { FormGridWrapper, FormTitle } from '~/styles/form_grid';
import { Container } from '~/styles/styles';
import { FormElement, Input } from '~/styles/form';
import { BaseButtonBlack } from '~/styles/button';
import { Link, useNavigate } from 'react-router-dom';
import { defaultTheme } from '~/styles/themes/default';
import images from '~/assets/images';
import configs from '~/configs';
import { toast } from 'react-toastify';
import authApi from '~/apis/auth.api';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getRules } from '~/utils/rules';

const ResetPageWrapper = styled.section`
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

const ResetPage = () => {
    const navigate = useNavigate();
    const handleForgotPassword = async (event) => {
        event.preventDefault();
        try {
            const response = await authApi.forgotPassword({ email: formik.values.email });
            if (response.status === 200) {
                toast.success('Gửi email thành công, vui lòng kiểm tra email của bạn', { autoClose: 3000 });
                navigate(configs.roures.auth.signIn);
            }
            if (response.status === 404) {
                toast.error('Email không tồn tại', { autoClose: 3000 });
            }
            if (response.status === 500) {
                toast.error('Gửi email không thành công', { autoClose: 3000 });
            }
        } catch (error) {
            toast.error('Gửi email không thành công', { autoClose: 3000 });
        }
    };
    const validationSchema = yup.object().shape(getRules());
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: handleForgotPassword,
    });
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
                                <p>
                                    Nhập email của bạn và chúng tôi sẽ gửi cho bạn một mật khẩu mới để đặt lại mật khẩu
                                    của bạn.
                                </p>
                            </FormTitle>

                            <form onSubmit={handleForgotPassword}>
                                <FormElement>
                                    <label htmlFor="" className="form-elem-label">
                                        Email
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
                                </FormElement>
                                <BaseButtonBlack type="submit" className="form-submit-btn">
                                    Gửi
                                </BaseButtonBlack>
                            </form>
                            <p className="flex flex-wrap account-rel-text">
                                <Link to={configs.roures.auth.signIn} className="font-medium">
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
