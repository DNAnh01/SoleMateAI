import { defaultTheme } from '~/styles/themes/default';

const { default: styled } = require('styled-components');

export const HeaderWrapper = styled.header`
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const PathLocation = styled.span`
    color: ${defaultTheme.color_dim_gray} !important;
`;
