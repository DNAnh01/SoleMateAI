import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { defaultTheme } from '~/styles/themes/default';

const CardWrapper = styled.div`
    background-color: ${defaultTheme.color_white};
    padding: 1rem;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Headline = styled.h6`
    font-size: 1rem;
    font-weight: 600;
    color: ${defaultTheme.color_jet};
    line-height: 1rem;
    user-select: none;
    margin-bottom: 0;
`;

const HeadlineBackground = styled.span`
    background-image: ${defaultTheme.color_yellow_green};
    -webkit-background-clip: text;
    background-clip: text;
`;
const Content = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    margin-right: 4px;
    justify-content: space-between;
`;

const Card = ({ headline, children }) => {
    return (
        <CardWrapper>
            <Header>
                <HeadlineBackground>
                    <Headline>{headline}</Headline>
                </HeadlineBackground>
            </Header>
            <Content>{children}</Content>
        </CardWrapper>
    );
};

Card.propTypes = {
    headline: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Card;
