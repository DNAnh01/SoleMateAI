import styled from 'styled-components';
import { FormElement, Input } from '~/styles/form';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import Icons from '~/components/common/Icons/Icons';

const PasswordToggleButton = styled.button`
    position: absolute;
    bottom: 100%;
    right: 0;

    .pwd-toggle-text {
        padding-left: 5px;
    }
`;

const PasswordInput = ({ fieldName, name, errorMsg = '', onChange, value, onBlur }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <FormElement>
            <label htmlFor="" className="form-elem-label">
                {fieldName}
            </label>
            <div className="form-elem-block">
                <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder=""
                    name={name}
                    className="form-elem-control"
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                />

                <PasswordToggleButton
                    type="button"
                    className="pwd-value-toggle flex items-center"
                    onClick={togglePassword}
                >
                    {showPassword ? (
                        <>
                            <Icons icon="closedEye"className="icon-default" color="#000" />
                        </>
                    ) : (
                        <>
                            <Icons icon="eye" className="icon-default" color="#000" />
                        </>
                    )}
                </PasswordToggleButton>
            </div>
            <span className="form-elem-error text-end font-medium">{errorMsg}</span>
        </FormElement>
    );
};

export default PasswordInput;

PasswordInput.propTypes = {
    fieldName: PropTypes.string,
    name: PropTypes.string,
    errorMsg: PropTypes.string,
};
