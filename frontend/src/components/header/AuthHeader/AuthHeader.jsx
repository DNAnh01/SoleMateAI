import styled from 'styled-components';
import { HeaderMainWrapper, SiteBrandWrapper } from '~/styles/header';
import { Container } from '~/styles/styles';
import { BaseLinkGreen, BaseLinkOutlineDark } from '~/styles/button';
import { breakpoints } from '~/styles/themes/default';
import images from '~/assets/images';
import configs from '~/configs';
import { useState } from 'react';

const ButtonGroupWrapper = styled.div`
    display: flex;
    gap: 8px;
    @media (max-width: ${breakpoints.sm}) {
        button,
        a {
            min-width: 100px;
        }
    }
`;

const AuthHeader = () => {
    const [activeButton, setActiveButton] = useState('signIn');

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    return (
        <HeaderMainWrapper className="flex items-center">
            <Container>
                <div className="header-wrap flex items-center justify-between">
                    <SiteBrandWrapper to="/" className="inline-flex">
                        <div className="brand-img-wrap flex items-center justify-center">
                            <img src={images.logo} alt="" className="site-brand-img" />
                        </div>
                        <span className="site-brand-text name-project">Sole Mate AI</span>
                    </SiteBrandWrapper>
                    <div className="flex items-center">
                        <ButtonGroupWrapper>
                            {activeButton === 'signIn' ? (
                                <BaseLinkGreen
                                    to={configs.roures.auth.signIn}
                                    onClick={() => handleButtonClick('signIn')}
                                >
                                    Đăng nhập
                                </BaseLinkGreen>
                            ) : (
                                <BaseLinkOutlineDark
                                    to={configs.roures.auth.signIn}
                                    onClick={() => handleButtonClick('signIn')}
                                >
                                    Đăng nhập
                                </BaseLinkOutlineDark>
                            )}
                            {activeButton === 'signUp' ? (
                                <BaseLinkGreen
                                    to={configs.roures.auth.signUp}
                                    onClick={() => handleButtonClick('signUp')}
                                >
                                    Đăng ký
                                </BaseLinkGreen>
                            ) : (
                                <BaseLinkOutlineDark
                                    to={configs.roures.auth.signUp}
                                    onClick={() => handleButtonClick('signUp')}
                                >
                                    Đăng ký
                                </BaseLinkOutlineDark>
                            )}
                        </ButtonGroupWrapper>
                    </div>
                </div>
            </Container>
        </HeaderMainWrapper>
    );
};

export default AuthHeader;
