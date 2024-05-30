import styled from 'styled-components';
import { Container } from '~/styles/styles';
import { FaRegEdit } from 'react-icons/fa';
import Breadcrumb from '~/components/common/Breadcrumb';
import { UserContent, UserDashboardWrapper } from '~/styles/user';
import UserMenu from '~/components/user/UserMenu';
import Title from '~/components/common/Title';
import { FormElement, Input } from '~/styles/form';
import { BaseLinkGreen } from '~/styles/button';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import configs from '~/configs';
import useAppStore from '~/store';
import { useContext } from 'react';
import { AddressContext } from '~/contexts/address.context';

const AccountPageWrapper = styled.main`
    .address-list {
        margin-top: 20px;
        grid-template-columns: repeat(2, 1fr);
        gap: 25px;

        @media (max-width: ${breakpoints.lg}) {
            grid-template-columns: repeat(1, 1fr);
        }
    }

    .address-item {
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding: 25px;
        row-gap: 8px;
    }

    .address-tags {
        gap: 12px;

        li {
            height: 28px;
            border-radius: 8px;
            padding: 2px 12px;
            background-color: ${defaultTheme.color_whitesmoke};
        }
    }

    .address-btns {
        margin-top: 12px;
        .btn-separator {
            width: 1px;
            border-radius: 50px;
            background: ${defaultTheme.color_platinum};
            margin: 0 10px;
        }
    }
`;

const breadcrumbItems = [
    {
        label: 'Home',
        link: configs.roures.home,
    },
    { label: 'Account', link: configs.roures.user.profile },
];

const AccountPage = () => {
    const { profile } = useAppStore();
    const { address } = useContext(AddressContext);
    return (
        <AccountPageWrapper className="page-py-spacing">
            <Container>
                <Breadcrumb items={breadcrumbItems} />
                <UserDashboardWrapper>
                    <UserMenu />
                    <UserContent>
                        <Title titleText={'Tài khoản'} />
                        <h4 className="title-sm">Thông tin chi tiết</h4>
                        <form>
                            <div className="form-wrapper">
                                <FormElement className="form-elem">
                                    <label htmlFor="" className="form-label font-semibold text-base">
                                        Tên hiển thị
                                    </label>
                                    <div className="form-input-wrapper flex items-center">
                                        <Input
                                            type="text"
                                            className="form-elem-control text-outerspace font-semibold"
                                            value={profile?.display_name}
                                            readOnly
                                        />
                                        <button type="button" className="form-control-change-btn">
                                            <FaRegEdit fontSize={18} />
                                        </button>
                                    </div>
                                </FormElement>
                                <FormElement className="form-elem">
                                    <label htmlFor="" className="form-label font-semibold text-base">
                                        Email
                                    </label>
                                    <div className="form-input-wrapper flex items-center">
                                        <Input
                                            type="email"
                                            className="form-elem-control text-outerspace font-semibold"
                                            value={profile?.email}
                                            readOnly
                                        />
                                        <button type="button" className="form-control-change-btn">
                                            <FaRegEdit fontSize={18} />
                                        </button>
                                    </div>
                                </FormElement>
                                <FormElement className="form-elem">
                                    <label htmlFor="" className="form-label font-semibold text-base">
                                        Số điện thoại
                                    </label>
                                    <div className="form-input-wrapper flex items-center">
                                        <Input
                                            type="text"
                                            className="form-elem-control text-outerspace font-semibold"
                                            value="+9686 6864 3434"
                                            readOnly
                                        />
                                        <button type="button" className="form-control-change-btn">
                                            <FaRegEdit fontSize={18} />
                                        </button>
                                    </div>
                                </FormElement>
                                <FormElement className="form-elem">
                                    <label htmlFor="" className="form-label font-semibold text-base">
                                        Mật khẩu
                                    </label>
                                    <div className="form-input-wrapper flex items-center">
                                        <Input
                                            type="password"
                                            className="form-elem-control text-outerspace font-semibold"
                                            value="Pass Key"
                                            readOnly
                                        />
                                        <button type="button" className="form-control-change-btn">
                                            <FaRegEdit fontSize={18} />
                                        </button>
                                    </div>
                                </FormElement>
                            </div>
                        </form>
                        <div>
                            <h4 className="title-sm">Địa chỉ giao hàng</h4>
                            <BaseLinkGreen to={configs.roures.user.addAddress}>Thêm địa chỉ</BaseLinkGreen>
                            <div className="address-list grid">
                                <div className="address-item grid">
                                    <p className="text-outerspace text-lg font-semibold address-title">
                                        {profile?.display_name}
                                    </p>
                                    {address && (
                                        <>
                                            <p className="text-gray text-base font-medium address-description">
                                                {address.province}
                                            </p>
                                            <p className="text-gray text-base font-medium address-description">
                                                {address.district}
                                            </p>
                                            <p className="text-gray text-base font-medium address-description">
                                                {address.ward}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </UserContent>
                </UserDashboardWrapper>
            </Container>
        </AccountPageWrapper>
    );
};

export default AccountPage;
