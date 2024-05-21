import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Icons from '~/components/common/Icons/Icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { defaultTheme } from '~/styles/themes/default';
import ShoeItem from '~/components/common/ShoeItem';
import Wrapper from '~/components/common/Wrapper';
import useDebounce from '~/hooks';
import productApi from '~/apis/product.api';

const SearchStyled = styled.div`
    --search-width: 364px;
    --search-border-radius: 92px;
    --search-height: 50px;
    --search-top-spacer: 9px;
    --search-button-width: 52px;
    --primary: ${defaultTheme.color_black};
    --black: ${defaultTheme.color_black};
    --font-family: ${defaultTheme.font_family_inter};
    --color-silver: ${defaultTheme.color_silver};
    --color-yellow-green: ${defaultTheme.color_yellow_green};

    .search-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .search-wrapper {
        width: var(--search-width);
        height: var(--search-height);
        padding-left: 16px;
        caret-color: var(--primary);
        position: relative;
        display: flex;
        background-color: var(--color-silver);
        border-radius: var(--search-border-radius);
        border: 1.5px solid transparent;
    }

    .search-result {
        width: var(--search-width);
        margin-top: 4px;
    }

    .search {
        display: flex;
        width: 100%;
        height: 100%;

        input {
            flex: 1;
            height: 100%;
            padding-right: 20px;
            color: var(--black);
            font-size: 1.2rem;
            background-color: transparent;
            font-family: var(--font-family);
            outline: none;
            border: none;
        }
    }

    .search-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--search-button-width);
        height: 100%;
        border-top-right-radius: var(--search-border-radius);
        border-bottom-right-radius: var(--search-border-radius);
        font-size: 1.8rem;
        color: rgba(22, 24, 35, 0.34);

        &:hover {
            cursor: pointer;
            background-color: ${defaultTheme.color_black};
        }

        &:active {
            background-color: ${defaultTheme.color_black_04};
        }
    }

    &::after {
        content: '';
        position: absolute;
        top: var(--search-top-spacer);
        right: var(--search-button-width);
        height: calc(var(--search-height) - var(--search-top-spacer) * 2);
        width: 1px;
        background-color: rgba(22, 24, 35, 0.12);
    }

    &:focus-within {
        border-color: rgba(22, 24, 35, 0.2);
    }

    .clear-icon,
    .loading-icon {
        position: absolute;
        font-size: 1.6rem;
        right: calc(var(--search-button-width) + 16px);
        top: 50%;
        transform: translateY(-50%);
        color: rgba(22, 24, 35, 0.34);
    }

    .loading-icon {
        animation: spinner 0.8s linear infinite;
    }

    @keyframes spinner {
        from {
            transform: translateY(-50%) rotate(0);
        }
        to {
            transform: translateY(-50%) rotate(360deg);
        }
    }
`;

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const debouncedValue = useDebounce(searchValue, 500);
    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await productApi.fetchProductByName(debouncedValue);
            if (result) {
                setSearchResult(result.data);
            } else {
                console.error('fetchProductByName error');
                setSearchResult([]);
            }
            setLoading(false);
        };
        fetchApi();
    }, [debouncedValue]);

    const handelClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handelHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        <div className="search-container">
            <SearchStyled>
                <HeadlessTippy
                    interactive
                    visible={showResult && searchResult.length > 0}
                    render={(attrs) => (
                        <div className="search-result" tabIndex="-1" {...attrs}>
                            <Wrapper>
                                {searchResult.map((result) => (
                                    <ShoeItem key={result?.id} data={result} />
                                ))}
                            </Wrapper>
                        </div>
                    )}
                    onClickOutside={handelHideResult}
                >
                    <div className="search-wrapper">
                        <div className="search">
                            <input
                                ref={inputRef}
                                value={searchValue}
                                placeholder="Tìm kiếm"
                                spellCheck={false}
                                onChange={handleChange}
                                onFocus={() => setShowResult(true)}
                            />

                            {!!searchValue && !loading && (
                                <button onClick={handelClear}>
                                    <Icons
                                        icon="close"
                                        className="clear-icon"
                                        width={16}
                                        height={16}
                                        color={defaultTheme.color_black}
                                    />
                                </button>
                            )}
                            {loading && (
                                <Icons
                                    icon="loading"
                                    className="loading-icon"
                                    width={16}
                                    height={16}
                                    color={defaultTheme.color_black}
                                />
                            )}
                            <button className="search-btn" onMouseDown={(e) => e.preventDefault()}>
                                <Icons icon="search" width={28} height={28} />
                            </button>
                        </div>
                    </div>
                </HeadlessTippy>
            </SearchStyled>
        </div>
    );
};

export default Search;
