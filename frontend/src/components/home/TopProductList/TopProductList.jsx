import styled from 'styled-components';
import { Container, Section } from '~/styles/styles';
import Title from '~/components/common/Title';
import Slider from 'react-slick';
import CustomNextArrow from '~/components/common/CustomNextArrow';
import CustomPrevArrow from '~/components/common/CustomPrevArrow';
import { newArrivalData } from '~/data/data.mock';
import { commonCardStyles } from '~/styles/card';
import { breakpoints } from '~/styles/themes/default';
import { PropTypes } from 'prop-types';

const ProductCardBoxWrapper = styled.div`
    ${commonCardStyles}
    .product-img {
        height: 262px;
        width: 262px;
    }

    @media (max-width: ${breakpoints.sm}) {
        padding-left: 6px;
        padding-right: 6px;
    }
`;

const ArrivalSliderWrapper = styled.div`
    .custom-prev-arrow {
        top: 43%;
        left: -18px;
        @media (max-width: ${breakpoints.xxl}) {
            left: 24px;
        }

        @media (max-width: ${breakpoints.xs}) {
            left: 4px;
        }
    }

    .custom-next-arrow {
        top: 43%;
        right: -18px;
        @media (max-width: ${breakpoints.xxl}) {
            right: 24px;
        }

        @media (max-width: ${breakpoints.xs}) {
            right: 4px;
        }
    }
`;

const TopProductList = ({ title }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
    };

    return (
        <Section>
            <Container>
                <Title titleText={title} />
                <ArrivalSliderWrapper>
                    <Slider nextArrow={<CustomNextArrow />} prevArrow={<CustomPrevArrow />} {...settings}>
                        {newArrivalData?.map((newArrival) => {
                            return (
                                <ProductCardBoxWrapper key={newArrival.id}>
                                    <div className="product-img">
                                        <img className="object-fit-cover" src={newArrival.imgSource} alt="" />
                                    </div>
                                    <div className="product-info">
                                        <p className="font-semibold text-xl">{newArrival.title}</p>
                                        <p className="font-semibold text-lg">{newArrival.price}</p>
                                    </div>
                                </ProductCardBoxWrapper>
                            );
                        })}
                    </Slider>
                </ArrivalSliderWrapper>
            </Container>
        </Section>
    );
};
TopProductList.propTypes = {
    title: PropTypes.string,
};

export default TopProductList;
