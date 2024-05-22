import styled from 'styled-components';
import { breakpoints, defaultTheme } from '~/styles/themes/default';

export const FilterTitle = styled.div`
    border-top: 1px solid rgba(190, 188, 189, 0.4);
    border-bottom: 1px solid rgba(190, 188, 189, 0.4);
    padding: 16px 20px;
    cursor: pointer;
    transition: ${defaultTheme.default_transition};

    &:hover {
        background-color: ${defaultTheme.color_whitesmoke};
    }

    .filter-title-icon {
        transition: ${defaultTheme.default_transition};
        &.rotate {
            transform: rotate(180deg);
        }
    }

    @media (max-width: ${breakpoints.lg}) {
        padding-top: 10px;
        padding-bottom: 10px;
    }
`;

export const FilterWrap = styled.div`
    padding: 20px;
    transition: ${defaultTheme.default_transition};

    @media (max-width: ${breakpoints.lg}) {
        display: none;
        padding-top: 10px;
        padding-bottom: 10px;

        &.show {
            display: block;
        }
    }

    &.hide {
        display: none;
    }
`;

export const BrandsFilter = styled.div`
    .brands-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
        gap: 16px;

        @media (max-width: 768px) {
            grid-template-columns: repeat(auto-fill, minmax(36px, 1fr));
            gap: 8px;
        }
    }

    .brands-item {
        position: relative;
        width: 40px;
        height: 30px;
        cursor: pointer;

        @media (max-width: 768px) {
            width: 36px;
            height: 24px;
        }

        input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            z-index: 5;
            cursor: pointer;

            &:checked + img {
                outline: 2px solid ${defaultTheme.color_black};
                outline-offset: 4px;
                transform: scale(0.9);
            }
        }

        img {
            display: block;
            width: 100%;
            height: 100%;
            transition: transform 0.3s ease;
            &:hover {
                transform: scale(0.9);
            }
        }
    }
`;

export const PriceFilter = styled.div`
    .filter-wrap {
        max-width: 400px;
        margin-right: auto;
        margin-left: auto;
    }

    .range-slider {
        height: 5px;
        position: relative;
        background-color: ${defaultTheme.color_black};
        border-radius: 2px;
        margin-top: 10px;
    }
    .range-selected {
        left: 30%;
        right: 30%;
        position: absolute;
        border-radius: 5px;
        background-color: ${defaultTheme.color_black};
    }
    .range-input {
        position: relative;
    }
    .range-input input {
        position: absolute;
        height: 5px;
        top: -6px;
        background: none;
        pointer-events: none;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
    }

    .range-input input::-webkit-slider-thumb {
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background-color: ${defaultTheme.color_yellow_green};
        pointer-events: auto;
        -webkit-appearance: none;
    }
    .range-input input::-moz-slider-thumb {
        height: 15px;
        width: 15px;
        border-radius: 50%;
        background-color: ${defaultTheme.color_yellow_green};
        pointer-events: auto;
        -webkit-appearance: none;
    }

    .range-price {
        margin: 20px 0;
        column-gap: 30px;
    }
    .range-price input {
        width: 50%;
        padding: 5px;
        height: 32px;
        border-radius: 4px;
        border: 1px solid ${defaultTheme.color_black};
    }
`;

export const ColorsFilter = styled.div`
    .colors-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(36px, 1fr));
        gap: 16px;

        @media (max-width: 768px) {
            grid-template-columns: repeat(auto-fill, minmax(24px, 1fr));
            gap: 8px;
        }
    }

    .colors-item {
        position: relative;
        width: 36px;
        height: 36px;
        cursor: pointer;

        @media (max-width: 768px) {
            width: 26px;
            height: 26px;
        }

        input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            z-index: 5;
            cursor: pointer;

            &:checked + span {
                outline: 2px solid ${defaultTheme.color_black}; /* Change this to the desired outline color */
                outline-offset: 4px;
                border-radius: 50%;
                transform: scale(0.9);
            }
        }

        span {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            transition: transform 0.3s ease;
            &:hover {
                transform: scale(0.9);
            }
        }
    }
`;

export const SizesFilter = styled.div`
    .sizes-list {
        gap: 12px;
        grid-template-columns: repeat(auto-fill, minmax(60px, 60px));

        @media (max-width: ${breakpoints.lg}) {
            grid-template-columns: repeat(auto-fill, minmax(40px 40px));
            gap: 6px;
        }
    }

    .sizes-item {
        height: 28px;
        position: relative;

        span {
            border-radius: 4px;
            border: 1px solid rgba(190, 188, 189, 0.8);
            position: absolute;
            top: 0;
            height: 28px;
            left: 0;
            width: 60px;
            height: 28px;
            text-transform: uppercase;

            @media (max-width: ${breakpoints.lg}) {
                width: 40px;
            }
        }

        input {
            opacity: 0;
            position: absolute;
            left: 0;
            top: 0;
            width: 60px;
            height: 28px;
            z-index: 5;
            cursor: pointer;

            @media (max-width: ${breakpoints.lg}) {
                width: 40px;
            }

            &:checked {
                & + span {
                    background-color: ${defaultTheme.color_yellow_green};
                    color: ${defaultTheme.color_white};
                    border-color: ${defaultTheme.color_yellow_green};
                }
            }
        }
    }
`;

export const StyleFilter = styled.div`
    .style-filter-item {
        padding: 4px 0;
        margin: 12px 0;
    }
`;
