import styled from 'styled-components';
import { Container } from '~/styles/styles';
import { Link } from 'react-router-dom';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import images from '~/assets/images';
import Icons from '~/components/common/Icons/Icons';

const FooterWrapper = styled.footer`
    padding-top: 60px;
    padding-bottom: 32px;

    @media (max-width: ${breakpoints.lg}) {
        padding-top: 30px;
        padding-bottom: 30px;
    }

    .footer-top {
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;

        @media (max-width: ${breakpoints.md}) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: ${breakpoints.xs}) {
            grid-template-columns: 100%;
            text-align: center;
        }
    }

    .footer-item {
        &-title {
            margin-bottom: 8px;
        }
    }

    .ftr-links {
        .ftr-link-item {
            margin-bottom: 8px;

            a {
                color: ${defaultTheme.color_whitesmoke};
                &:hover {
                    color: ${defaultTheme.color_yellow};
                }
            }
        }
    }

    .footer-middle {
        padding: 20px 0 32px 0;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;

        @media (max-width: ${breakpoints.lg}) {
            padding: 20px 0;
        }

        @media (max-width: ${breakpoints.xs}) {
            grid-template-columns: 100%;
            text-align: center;
        }
    }

    .ftr-social-links {
        column-gap: 8px;

        @media (max-width: ${breakpoints.xs}) {
            justify-content: center;
        }

        .ftr-social-link {
            width: 25px;
            height: 25px;
            border-radius: 4px;
        }
    }

    .ftr-app-links {
        .app-links-title {
            margin-bottom: 12px;
        }
        .app-links-group {
            column-gap: 6px;

            @media (max-width: ${breakpoints.sm}) {
                flex-direction: column;
                align-items: flex-start;
            }

            @media (max-width: ${breakpoints.xs}) {
                flex-direction: row;
                justify-content: center;
            }
        }

        a {
            img {
                width: 120px;

                @media (max-width: ${breakpoints.md}) {
                    width: 100px;
                }
            }
        }
    }

    .social-icon {
        width: 25px;
        height: 25px;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${defaultTheme.color_white};
        &:hover {
            background-color: ${defaultTheme.color_yellow_green};
            transform: scale(1.2);
        }
    }
`;

const footerData = [
    {
        id: 'f_need_help',
        title: 'Cần Trợ Giúp',
        links: [
            { text: 'Liên Hệ Chúng Tôi', url: '/contact' },
            { text: 'Theo Dõi Đơn Hàng', url: '/track_order' },
            { text: 'Trả Hàng & Hoàn Tiền', url: '/returns_refunds' },
        ],
    },
    {
        id: 'f_company',
        title: 'Công Ty',
        links: [
            { text: 'Về Chúng Tôi', url: '*' },
            { text: 'Sole Mate AI', url: '*' },
            { text: 'Hợp Tác', url: '*' },
        ],
    },
    {
        id: 'f_more_info',
        title: 'Thông Tin Thêm',
        links: [
            { text: 'Điều Khoản và Điều Kiện', url: '*' },
            { text: 'Chính Sách Bảo Mật', url: '*' },
            { text: 'Chính Sách Giao Hàng', url: '*' },
        ],
    },
    {
        id: 'f_location',
        title: 'Địa Chỉ',
        lists: [
            { text: 'donguyenanhgithub@gmail.com' },
            { text: 'Hòa Khánh Bắc, Đà Nẵng' },
            { text: 'Điện Thoại: +000 999 8888' },
        ],
    },
];
const socialLinksData = [
    {
        id: 'social_link_1',
        icon_name: 'google',
    },
    {
        id: 'social_link_2',
        icon_name: 'facebook',
    },
    {
        id: 'social_link_3',
        icon_name: 'instagram',
    },
];

const Footer = () => {
    return (
        <FooterWrapper className="bg-outerspace">
            <Container className="container">
                <div className="footer-top grid">
                    {footerData?.map((footer) => {
                        return (
                            <div className="footer-item" key={footer.id}>
                                <h4 className="text-white text-lg footer-item-title">{footer.title}</h4>
                                {footer.links && (
                                    <ul className="ftr-links">
                                        {footer.links?.map((link, index) => (
                                            <li className="ftr-link-item" key={index}>
                                                <Link to={link.url} className="text-white text-base">
                                                    {link.text}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {footer.lists && (
                                    <ul className="ftr-links">
                                        {footer.lists?.map((link, index) => (
                                            <li className="ftr-link-item text-white text-base" key={index}>
                                                {link.text}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="footer-middle grid">
                    <div className="ftr-social-links flex items-center">
                        {socialLinksData?.map((socialLink) => {
                            return (
                                <Link
                                    to="*"
                                    key={socialLink.id}
                                    className="ftr-social-link bg-white flex items-center justify-center"
                                >
                                    <div className="social-icon">
                                        <Icons icon={socialLink.icon_name} width={18} height={18} />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <div className="ftr-app-links">
                        <p className="app-links-title text-white text-xl font-semibold text-lg">Tải ứng dụng tại</p>
                        <div className="app-links-group flex items-center">
                            <Link to="*">
                                <img src={images.googlePlay} alt="" />
                            </Link>
                            <Link to="*">
                                <img src={images.appStore} alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </FooterWrapper>
    );
};

export default Footer;
