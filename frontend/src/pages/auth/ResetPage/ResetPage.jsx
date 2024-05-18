import styled from 'styled-components';
import { FormGridWrapper, FormTitle } from '~/styles/form_grid';
import { Container } from '~/styles/styles';
import { staticImages } from '~/utils/images';
import { FormElement, Input } from '~/styles/form';
import { BaseButtonBlack } from '~/styles/button';
import { Link } from 'react-router-dom';

const ResetPageWrapper = styled.section``;

const ResetPage = () => {
    return (
        <ResetPageWrapper>
            <FormGridWrapper>
                <Container>
                    <div className="form-grid-content">
                        <div className="form-grid-left">
                            <img src={staticImages.background_vertical} className="object-fit-cover" alt="" />
                        </div>
                        <div className="form-grid-right">
                            <FormTitle>
                                <h3>Reset Your Password</h3>
                                <p>Enter your email and we &apos;ll send you a link to reset your password.</p>
                                <p>Please check it.</p>
                            </FormTitle>

                            <form>
                                <FormElement>
                                    <label htmlFor="" className="form-elem-label">
                                        Email
                                    </label>
                                    <Input type="text" placeholder="" name="" className="form-elem-control" />
                                </FormElement>
                                <BaseButtonBlack type="submit" className="form-submit-btn">
                                    Send
                                </BaseButtonBlack>
                            </form>
                            <p className="flex flex-wrap account-rel-text">
                                <Link to="/sign_in" className="font-medium">
                                    Back to Login
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
