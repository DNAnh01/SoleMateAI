import { createContext, useState } from 'react';

export const getInitialAddressContext = () => ({
    address: {},
    setAddress: () => null,
});

const initialAddressContext = getInitialAddressContext();

export const AddressContext = createContext(initialAddressContext);

export const AddressProvider = ({ children, defaultValue = initialAddressContext }) => {
    const [address, setAddress] = useState({});
    return (
        <AddressContext.Provider
            value={{
                address,
                setAddress,
            }}
        >
            {children}
        </AddressContext.Provider>
    );
};
