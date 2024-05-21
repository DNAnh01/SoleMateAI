import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { breakpoints } from '~/styles/themes/default';

// common header stylings for both auth & main pages
export const HeaderMainWrapper = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    background-color: #fff;

    min-height: 100px;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 24px,
        rgba(17, 17, 26, 0.05) 0px 16px 56px;

    .header-wrap {
        column-gap: 20px;

        @media (max-width: ${breakpoints.sm}) {
            column-gap: 8px;
        }
    }

    .name-project {
        display: inline-block;
        height: 64px;
        line-height: 64px;
        vertical-align: middle;
    }
`;

export const SiteBrandWrapper = styled(Link)`
    text-decoration: none;
    column-gap: 10px;

    .brand-img-wrap {
        img {
            width: 64px;
        }
    }

    .site-brand-text {
        font-size: 24px;
        font-weight: 600;

        @media (max-width: ${breakpoints.xl}) {
            font-size: 20px;
        }

        @media (max-width: ${breakpoints.xs}) {
            display: none;
        }
    }
`;
