import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Container } from '~/styles/styles';
import Breadcrumb from '~/components/common/Breadcrumb';
import { UserContent, UserDashboardWrapper } from '~/styles/user';
import UserMenu from '~/components/user/UserMenu';
import Title from '~/components/common/Title';
import { FormElement } from '~/styles/form';
import { BaseButtonGreen, BaseButtonWhitesmoke } from '~/styles/button';
import { defaultTheme } from '~/styles/themes/default';
import configs from '~/configs';
import addresses from '~/assets/json/addresses';
import addressApi from '~/apis/address.api';
import { useNavigate } from 'react-router-dom';
import { AddressContext } from '~/contexts/address.context';
import { toast } from 'react-toastify';
import useAppStore from '~/store';

const AddressPageWrapper = styled.main`
    .form-elem-control {
        padding-left: 16px;
        border: 1px solid ${defaultTheme.color_platinum};

        &:focus {
            border-color: ${defaultTheme.color_silver};
        }
    }
`;

const breadcrumbItems = [
    { label: 'Home', link: `${configs.roures.home}` },
    { label: 'Account', link: `${configs.roures.user.profile}` },
    { label: 'Add Address', link: `${configs.roures.user.addAddress}` },
];

const AddressPage = () => {
    const { setIsLoadingAPI } = useAppStore();
    const [districtList, setDistrictList] = useState([]);
    const [communeList, setCommuneList] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedCommune, setSelectedCommune] = useState('');
    const [provinceName, setProvinceName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [communeName, setCommuneName] = useState('');
    const { setAddress } = useContext(AddressContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedProvince) {
            const filteredDistricts = addresses.district.filter((district) => district.idProvince === selectedProvince);
            setDistrictList(filteredDistricts);
            setCommuneList([]);
            setSelectedDistrict('');
            setSelectedCommune('');
            const province = addresses.province.find((p) => p.idProvince === selectedProvince);
            setProvinceName(province ? province.name : '');
        } else {
            setDistrictList([]);
            setCommuneList([]);
            setProvinceName('');
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            const filteredCommunes = addresses.commune.filter((commune) => commune.idDistrict === selectedDistrict);
            setCommuneList(filteredCommunes);
            setSelectedCommune('');
            const district = addresses.district.find((d) => d.idDistrict === selectedDistrict);
            setDistrictName(district ? district.name : '');
        } else {
            setCommuneList([]);
            setDistrictName('');
        }
    }, [selectedDistrict]);

    useEffect(() => {
        if (selectedCommune) {
            const commune = addresses.commune.find((c) => c.idCommune === selectedCommune);
            setCommuneName(commune ? commune.name : '');
        } else {
            setCommuneName('');
        }
    }, [selectedCommune]);

    const handleProvinceChange = (event) => {
        setSelectedProvince(event.target.value);
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
    };

    const handleCommuneChange = (event) => {
        setSelectedCommune(event.target.value);
    };

    const handleSave = async (event) => {
        event.preventDefault();
        // API call can be done here to save the address
        try {
            setIsLoadingAPI(true);
            const response = await addressApi.addOrCheckAddress({
                province: provinceName,
                district: districtName,
                ward: communeName,
            });
            if (response.status !== 200) {
                setAddress({});
            }
            toast.success('Đã thêm địa chỉ mới', {
                autoClose: 2000,
            });
            setAddress(response.data);
            // After saving, redirect to profile page
            navigate(configs.roures.user.profile);
        } catch (error) {
        } finally {
            setIsLoadingAPI(false);
        }
    };

    const handleCancel = () => {
        // Redirect to profile page without saving
        navigate(configs.roures.user.profile);
    };

    return (
        <AddressPageWrapper className="page-py-spacing">
            <Container>
                <Breadcrumb items={breadcrumbItems} />
                <UserDashboardWrapper>
                    <UserMenu />
                    <UserContent>
                        <Title titleText={'Tài khoản'} />
                        <h4 className="title-sm">Thêm địa chỉ</h4>
                        <form onSubmit={handleSave}>
                            <div className="form-wrapper">
                                <FormElement>
                                    <label htmlFor="province" className="form-label font-semibold text-base">
                                        Tỉnh / Thành phố*
                                    </label>
                                    <select
                                        id="province"
                                        className="form-elem-control"
                                        value={selectedProvince}
                                        onChange={handleProvinceChange}
                                    >
                                        <option value="">Chọn Tỉnh/Thành Phố...</option>
                                        {addresses.province.map((province) => (
                                            <option key={province.idProvince} value={province.idProvince}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                </FormElement>
                                <FormElement>
                                    <label htmlFor="district" className="form-label font-semibold text-base">
                                        Quận / Huyện*
                                    </label>
                                    <select
                                        id="district"
                                        className="form-elem-control"
                                        value={selectedDistrict}
                                        onChange={handleDistrictChange}
                                        disabled={!selectedProvince}
                                    >
                                        <option value="">Chọn Quận/Huyện...</option>
                                        {districtList.map((district) => (
                                            <option key={district.idDistrict} value={district.idDistrict}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                </FormElement>
                                <FormElement>
                                    <label htmlFor="commune" className="form-label font-semibold text-base">
                                        Phường / Xã*
                                    </label>
                                    <select
                                        id="commune"
                                        className="form-elem-control"
                                        value={selectedCommune}
                                        onChange={handleCommuneChange}
                                        disabled={!selectedDistrict}
                                    >
                                        <option value="">Chọn Phường/Xã...</option>
                                        {communeList.map((commune) => (
                                            <option key={commune.idCommune} value={commune.idCommune}>
                                                {commune.name}
                                            </option>
                                        ))}
                                    </select>
                                </FormElement>
                            </div>
                            <div className="form-btns flex">
                                <BaseButtonGreen type="submit">Lưu</BaseButtonGreen>
                                <BaseButtonWhitesmoke type="button" onClick={handleCancel}>
                                    Hủy
                                </BaseButtonWhitesmoke>
                            </div>
                        </form>
                    </UserContent>
                </UserDashboardWrapper>
            </Container>
        </AddressPageWrapper>
    );
};

export default AddressPage;
