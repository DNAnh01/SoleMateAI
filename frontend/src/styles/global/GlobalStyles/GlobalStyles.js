import { createGlobalStyle } from 'styled-components';
import { breakpoints, defaultTheme } from '~/styles/themes/default';

export const GlobalStyles = createGlobalStyle`
    /* Font embedded  */
    @font-face {
    font-family: Poppins;
    src: url('/assets/fonts/Poppins-Thin.ttf');
    font-weight: 100;
    }

    @font-face {
        font-family: Poppins;
        src: url('/assets/fonts/Poppins-Light.ttf');
        font-weight: 200;
    }

    @font-face {
        font-family: Poppins;
        src: url('/assets/fonts/Poppins-Regular.ttf');
        font-weight: 400;
    }

    @font-face {
        font-family: Poppins;
        src: url('/assets/fonts/Poppins-Medium.ttf');
        font-weight: 500;
    }

    @font-face {
        font-family: Poppins;
        src: url('/assets/fonts/Poppins-Bold.ttf');
        font-weight: 700;
    }

    @font-face {
        font-family: Poppins;
        src: url('/assets/fonts/Poppins-Black.ttf');
        font-weight: 900;
    }
    // Scrollbar CSS
    html *::-webkit-scrollbar {
        border-radius: 0;
        width: 8px;
    }

    html *::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(22, 24, 35, 0.2);
    }

    html *::-webkit-scrollbar-track {
        border-radius: 0;
        background-color: rgba(0, 0, 0, 0);
    }
    /* Reset css */
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-family: ${defaultTheme.font_family_inter}!important;
    }

    html {
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        -webkit-text-size-adjust: 100%;
    }
    body{
        min-height: 100vh;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.6;
        font-family: ${defaultTheme.font_family_inter};
        color: ${defaultTheme.color_jet};
        /* Custom tippy tooltip */
        .tippy-box {
        border-radius: 8px;
        font-weight: 600;
        font-size: 16px;
        line-height: 2.2rem;
        background-color: ${defaultTheme.color_gray};
        margin-top: -10px;
        }

        .tippy-arrow {
            color: ${defaultTheme.color_gray};
        }

        .tippy-content {
            padding: 8px 9px;
        }

        .tippy-box[data-placement^='bottom'] > .tippy-arrow:before {
            top: -7px;
        }
    }

    ul {
        list-style-type: none;
    }

    a {
        transition: ${defaultTheme.default_transition};
    }

    button {
        border: none;
        cursor: pointer;
        background-color: transparent;
        transition: ${defaultTheme.default_transition};
    }
    
    



    /* flexbox and grid */
    .flex {
        display: flex;
        &-col {
            flex-direction: column;
        }
        &-wrap {
            flex-wrap: wrap;
        }
    }

    .inline-flex {
        display: inline-flex;
    }

    .items {
        &-center {
            align-items: center;
        }
        &-start {
            align-items: flex-start;
        }
        &-end {
            align-items: flex-end;
        }
        &-stretch {
            align-items: stretch;
        }
        &-baseline{
            align-items: baseline;
        }
    }

    .justify {
        &-center {
            justify-content: center;
        }
        &-between {
            justify-content: space-between;
        }
        &-start {
            justify-content: flex-start;
        }
        &-end {
            justify-content: flex-end;
        }
    }

    .grid {
        display: grid;
    }

    .object-fit-cover {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        object-position: top;
    }
    .no-wrap {
        white-space: nowrap;
    }

    // heights and width
    .h-full {
        height: 100%;
    }

    .w-full {
        width: 100%;
    }
    // font weights
    .font-light {
        font-weight: 300;
    }
    .font-normal {
        font-weight: 400;
    }
    .font-medium {
        font-weight: 500;
    }
    .font-semibold {
        font-weight: 600;
    }
    .font-bold {
        font-weight: 700;
    }
    .font-extrabold {
        font-weight: 800;
    }

    // text
    [class^="text"] {
        color: ${defaultTheme.color_outerspace};
    }

    .text-white {
        color: ${defaultTheme.color_white}!important;
    }
    .text-gray {
        color: ${defaultTheme.color_gray};
    }
    .text-black {
        color: ${defaultTheme.color_black};
    }
    .text-sea-green {
        color: ${defaultTheme.color_yellow_green};
    }
    .text-red {
        color: ${defaultTheme.color_red};
    }
    .text-yellow {
        color: ${defaultTheme.color_yellow};
    }
    .text-outerspace {
        color: ${defaultTheme.color_outerspace};
    }
    .text-silver {
        color: ${defaultTheme.color_silver};
    }

    .text-dark_slate_blue{
        color: ${defaultTheme.color_dark_slate_blue};
    }

    .text-start {
        text-align: left;
    }
    .text-end {
        text-align: right;
    }
    .text-underline {
        text-decoration: underline;
    }
    .text-center {
        text-align: center;
    }

    .uppercase {
        text-transform: uppercase;
    }
    .capitalize {
        text-transform: capitalize;
    }
    .italic {
        font-style: italic;
    }

    // backgrounds
    .bg-white {
        background-color: ${defaultTheme.color_white};
    }
    .bg-gray {
        background-color: ${defaultTheme.color_gray};
    }
    .bg-black {
        background-color: ${defaultTheme.color_black};
    }
    .bg-sea-green {
        background-color: ${defaultTheme.color_yellow_green};
    }
    .bg-transparent {
        background-color: transparent;
    }
    .bg-outerspace {
        background-color: ${defaultTheme.color_outerspace};
    }
    .bg-silver{
        background-color: ${defaultTheme.color_silver};
    }

    // page
    .page-py-spacing {
        padding-top: 48px !important;
        padding-bottom: 48px !important;

        @media(max-width: ${breakpoints.lg}){
            padding-top: 36px!important;
            padding-bottom: 36px!important;
        }

        @media(max-width: ${breakpoints.sm}){
            padding-top: 24px!important;
            padding-bottom: 24px!important;
        }
    }

    // typography
    a {
        text-decoration: none;
        color: ${defaultTheme.color_jet};
    }

    .text-xs {
        font-size: 12px;
    }
    .text-sm {
        font-size: 13px;
    }
    .text-base {
        font-size: 14px;
    }
    .text-lg {
        font-size: 15px;
    }
    .text-xl {
        font-size: 16px;
    }
    .text-xxl {
        font-size: 18px;
    }
    .text-3xl {
        font-size: 20px;
    }
    .text-4xl{
        font-size: 24px;
    }

    .title-sm{
        font-size: 20px;
        margin-bottom: 16px;
    }

    @media screen and (max-width: 575.98px){
        .text-xs {
            font-size: 11px !important;
        }
        .text-sm {
            font-size: 12px !important;
        }
        .text-base {
            font-size: 13px !important;
        }
        .text-lg {
            font-size: 14px !important;
        }
        .text-xl {
            font-size: 15px !important;
        }
        .text-xxl {
            font-size: 17px !important;
        }
        .text-3xl {
            font-size: 19px !important;
        }
        .text-4xl{
            font-size: 22px!important;
        }
    }

    @media screen and (max-width: 420px) {
        .text-xs {
            font-size: 10px !important;
        }
        .text-sm {
            font-size: 11px !important;
        }
        .text-base {
            font-size: 12px !important;
        }
        .text-lg {
            font-size: 13px !important;
        }
        .text-xl {
            font-size: 14px !important;
        }
        .text-xxl {
            font-size: 16px !important;
        }
        .text-3xl {
            font-size: 18px !important;
        }
        .text-4xl{
            font-size: 20px!important;
        }
    }

    .icon-default {
        width: 24px;
        height: 24px;
        &:hover {
            transform: scale(1.2);
        }
    }
`;
