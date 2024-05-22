import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { defaultTheme } from '~/styles/themes/default';

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;

    button {
        background-color: ${defaultTheme.color_white};
        border-radius: 4px;
        border: 1px solid ${defaultTheme.color_black};
        padding: 10px 15px;
        margin: 0 5px;
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s;

        &:hover {
            background-color: ${defaultTheme.color_yellow_green};
            color: ${defaultTheme.color_white};
        }

        &:active {
            background-color: ${defaultTheme.color_yellow};
            color: ${defaultTheme.color_black};
        }

        &:disabled {
            background-color: ${defaultTheme.color_yellow_green};
            cursor: not-allowed;
            color: ${defaultTheme.color_white};
            border: 1px solid ${defaultTheme.color_yellow_green};
        }
    }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <PaginationWrapper>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
                <button key={index} onClick={() => onPageChange(index + 1)} disabled={index + 1 === currentPage}>
                    {index + 1}
                </button>
            ))}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
        </PaginationWrapper>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
