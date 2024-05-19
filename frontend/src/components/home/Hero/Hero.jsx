import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Container } from '~/styles/styles';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import CustomNextArrow from '~/components/common/CustomNextArrow';
import CustomPrevArrow from '~/components/common/CustomPrevArrow';
import { bannerData } from '~/data/data.api.banner';
import { getFormattedDate } from '~/utils/helper';

const SectionHeroWrapper = styled.section`
    margin-top: 72px;
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
    height: 716px;
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

    .hero-text-top {
        font-size: 26px;

        @media (max-width: ${breakpoints.lg}) {
            font-size: 24px;
        }
    }

    .hero-text-large {
        font-size: 60px;
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

const Hero = () => {
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
                    {bannerData?.map((banner) => (
                        <HeroSliderItemWrapper key={banner.id}>
                            {console.log(banner.id)}
                            <HeroSlideContent className="flex items-center w-full h-full">
                                <Container>
                                    <HeroSlideContentContainer>
                                        <div>
                                            <p className="hero-text-top font-bold italic">
                                                {'Từ ngày: ' + getFormattedDate(banner.start_date)}
                                            </p>
                                            <p className="hero-text-top font-bold italic">
                                                {'Đến ngày: ' + getFormattedDate(banner.end_date)}
                                            </p>
                                            <h2 className="hero-text-large font-extrabold">{banner.promotion_name}</h2>
                                            <p className="hero-text-bottom font-semibold uppercase">
                                                {'Giảm giá: ' + banner.discount_percent + '% cho các sản phẩm'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="hero-text-top font-bold italic">
                                                {'Từ ngày: ' + getFormattedDate(banner.start_date)}
                                            </p>
                                            <p className="hero-text-top font-bold italic">
                                                {'Đến ngày: ' + getFormattedDate(banner.end_date)}
                                            </p>
                                            <h2 className="hero-text-large font-extrabold">{banner.promotion_name}</h2>
                                            <p className="hero-text-bottom font-semibold uppercase">
                                                {'Giảm giá: ' + banner.discount_percent + '% cho các sản phẩm'}
                                            </p>
                                        </div>
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
