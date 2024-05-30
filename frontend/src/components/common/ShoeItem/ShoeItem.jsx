import React from 'react';
import styled from 'styled-components';
import Image from '../Image';
import { defaultTheme } from '~/styles/themes/default';
import { currencyFormat } from '~/utils/helper';
import { Link } from 'react-router-dom';

const ShoeItemWrapper = styled(Link)`
    display: flex;
    align-items: center;
    padding: 6px 16px;
    cursor: pointer;

    &:hover {
        border-radius: 8px;
        background-color: ${defaultTheme.color_yellow_green};
    }

    .shoe-image {
        width: 40px;
        height: 40px;
        object-fit: cover;
    }

    .info {
        flex: 1;
        margin-left: 12px;
        display: flex;
        flex-direction: column;

        h4 {
            margin: 0;
            font-size: 16px;
            line-height: 1.2;
        }

        .details {
            display: flex;
            align-items: center;
            margin-top: 4px;

            span {
                display: inline-block;
                margin-right: 8px;
                vertical-align: middle;

                &:last-child {
                    margin-right: 0;
                }
            }

            .brand-logo {
                width: 30px;
                height: 30px;
                object-fit: contain;
                margin-right: 8px;
            }

            .display-price {
                text-decoration: line-through;
                color: ${defaultTheme.color_gray};
            }

            .discounted-price {
                font-weight: bold;
                color: ${defaultTheme.color_red};
            }
        }
    }
`;

const ShoeItem = ({ data }) => {
    return (
        <ShoeItemWrapper to={`/product/${data.id}`}>
            <Image className="shoe-image" src={data?.image_url} alt={data?.shoe_name} />
            <div className="info">
                <h4>{data?.shoe_name}</h4>
                <div className="details">
                    <Image className="brand-logo" src={data?.brand?.brand_logo} alt={data?.brand?.brand_name} />
                    <span className="color-dot" style={{ backgroundColor: data?.color?.hex_value }}></span>
                    <span className="display-price">{currencyFormat(data?.display_price)}</span>
                    <span className="discounted-price">{currencyFormat(data?.discounted_price)}</span>
                </div>
            </div>
        </ShoeItemWrapper>
    );
};

export default ShoeItem;
