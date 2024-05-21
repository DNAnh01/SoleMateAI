import PropTypes from 'prop-types';

import React from 'react';
import styled from 'styled-components';
import { defaultTheme } from '~/styles/themes/default';

const WrapperStyled = styled.div`
    width: 100%;
    max-height: min((100vh - 96px) - 60px, 734px);
    min-height: 100px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background: ${defaultTheme.color_white};
    box-shadow: ${defaultTheme.color_dark_slate_blue} 0px 2px 12px;
`;

const Wrapper = ({ children, className }) => {
    return <WrapperStyled className={className}>{children}</WrapperStyled>;
};
Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Wrapper;
