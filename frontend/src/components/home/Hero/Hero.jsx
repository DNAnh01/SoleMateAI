import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Container } from '~/styles/styles';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import CustomNextArrow from '~/components/common/CustomNextArrow';
import CustomPrevArrow from '~/components/common/CustomPrevArrow';
import { formatCurrency, getFormattedDate } from '~/utils/helper';
import Image from '~/components/common/Image';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useEffect, useState } from 'react';
import promotionApi from '~/apis/promotion.api';
import { toast } from 'react-toastify';

const SectionHeroWrapper = styled.section`
    margin-top: 100px;
    position: relative;
    overflow: hidden;
    background: linear-gradient(to top right, ${defaultTheme.color_yellow_green}, ${defaultTheme.color_purple});
    background-size: 200% 200%;
    animation: Gradient 2s ease infinite;

    @keyframes Gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`;

const HeroSliderWrapper = styled.div`
    .custom-prev-arrow {
        left: 16px !important;

        @media (max-width: ${breakpoints.md}) {
            left: 16px !important;
        }
    }

    .custom-next-arrow {
        right: 16px !important;
        @media (max-width: ${breakpoints.md}) {
            right: 16px !important;
        }
    }
`;

const HeroSliderItemWrapper = styled.div`
    position: relative;
    height: 400px;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    @media (max-width: ${breakpoints.xxl}) {
        margin-left: 50px;
        margin-right: 50px;
    }

    @media (max-width: ${breakpoints.md}) {
        margin-left: 16px;
        margin-right: 16px;
    }

    @media (max-width: ${breakpoints.sm}) {
        margin: 0;
        text-align: center;
    }
`;

const HeroSlideContent = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    max-width: 1100px;
    z-index: 10;
    overflow: hidden;

    .container {
        max-width: 840px;
        margin-left: 0;

        @media (max-width: ${breakpoints.xxl}) {
            margin-left: 50px;
            margin-right: 50px;
        }

        @media (max-width: ${breakpoints.md}) {
            margin-left: 16px;
            margin-right: 16px;
        }

        @media (max-width: ${breakpoints.sm}) {
            margin: 0;
            text-align: center;
        }
    }

    .hero-text {
        font-family: ${defaultTheme.font_family_inter};
        color: ${defaultTheme.color_white};
    }

    .hero-text-top {
        font-size: 26px;
        @media (max-width: ${breakpoints.lg}) {
            font-size: 24px;
        }
    }

    .hero-text-large {
        font-size: 40px;
        letter-spacing: 0.315px;
        line-height: 1.2;
        margin-bottom: 20px;

        @media (max-width: ${breakpoints.lg}) {
            font-size: 60px;
        }

        @media (max-width: ${breakpoints.lg}) {
            font-size: 48px;
        }

        @media (max-width: ${breakpoints.lg}) {
            font-size: 36px;
        }

        @media (max-width: ${breakpoints.lg}) {
            font-size: 32px;
        }
    }

    .hero-text-bottom {
        font-size: 20px;
        margin-bottom: 24px;

        @media (max-width: ${breakpoints.lg}) {
            font-size: 20px;
        }
    }
`;

const HeroSlideContentContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const HeroContentLeft = styled.div`
    width: 50%;
    height: 100%;
`;

const HeroContentRight = styled.div`
    width: 50%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 10px;

    .image-wrapper {
        overflow: hidden;
        position: relative;
        transition: transform 0.3s, box-shadow 0.3s;

        &:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 20px ${defaultTheme.color_orange};
        }

        .image-count {
            position: absolute;
            bottom: 0;
            right: 0;
            background-color: ${defaultTheme.color_black_04};
            color: white;
            padding: 5px;
            border-radius: 50%;
        }
    }
`;

const TooltipContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h4 {
        margin: 0;
        font-size: 14px;
        color: ${defaultTheme.color_black};
    }

    .price-info {
        display: flex;
        justify-content: space-around;
        width: 100%;
        font-size: 16px;
    }

    .display-price {
        color: ${defaultTheme.color_black_04};
        text-decoration: line-through;
        margin-right: 8px;
    }

    .discounted-price {
        color: ${defaultTheme.color_red};
    }
`;

const Hero = () => {
    const [promotions, setPromotions] = useState([]);
    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await promotionApi.getAllPromotion();
                setPromotions(response.data);
            } catch (error) {
                toast.error('Không có chương trình khuyến mãi nào.', {
                    autoClose: 3000,
                });
            }
        };
        fetchPromotions();
    }, []);

    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true,
                },
            },
        ],
    };

    return (
        <SectionHeroWrapper>
            <HeroSliderWrapper>
                <Slider nextArrow={<CustomNextArrow />} prevArrow={<CustomPrevArrow />} {...settings}>
                    {promotions?.map((banner) => (
                        <HeroSliderItemWrapper key={banner.id}>
                            <HeroSlideContent className="flex items-center w-full h-full">
                                <Container>
                                    <HeroSlideContentContainer>
                                        <HeroContentLeft>
                                            <p className="hero-text hero-text-top font-bold">
                                                {'Từ ngày: ' + getFormattedDate(banner.start_date)}
                                            </p>
                                            <p className="hero-text hero-text-top font-bold">
                                                {'Đến ngày: ' + getFormattedDate(banner.end_date)}
                                            </p>
                                            <h2 className="hero-text hero-text-large font-extrabold">
                                                {banner.promotion_name}
                                            </h2>
                                            <p className="hero-text hero-text-bottom font-semibold uppercase">
                                                {'Giảm giá: ' + banner.discount_percent + '% cho các sản phẩm'}
                                            </p>
                                        </HeroContentLeft>
                                        <HeroContentRight>
                                            {banner.shoes.slice(0, 15).map((shoe, index) => (
                                                <div className="image-wrapper" key={shoe.id}>
                                                    <Tippy
                                                        key={shoe.id}
                                                        delay={[0, 40]}
                                                        placement="bottom"
                                                        content={
                                                            <TooltipContent>
                                                                <h4>{shoe.shoe_name}</h4>
                                                                <div className="price-info">
                                                                    <p className="display-price">
                                                                        {formatCurrency(shoe.display_price)}
                                                                    </p>
                                                                    <p className="discounted-price">
                                                                        {formatCurrency(shoe.discounted_price)}
                                                                    </p>
                                                                </div>
                                                            </TooltipContent>
                                                        }
                                                    >
                                                        <Image src={shoe.image_url} alt={shoe.shoe_name} />
                                                    </Tippy>
                                                    {index === 14 && banner.shoes.length > 15 && (
                                                        <div className="image-count">+{banner.shoes.length - 14}</div>
                                                    )}
                                                </div>
                                            ))}
                                        </HeroContentRight>
                                    </HeroSlideContentContainer>
                                </Container>
                            </HeroSlideContent>
                        </HeroSliderItemWrapper>
                    ))}
                </Slider>
            </HeroSliderWrapper>
        </SectionHeroWrapper>
    );
};

export default Hero;
