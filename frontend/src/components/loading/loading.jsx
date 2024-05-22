import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import useAppStore from '~/store';

const Loading = () => {
    const { isLoadingAPI } = useAppStore();
    if (!isLoadingAPI) {
        return <></>;
    }
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-[10000] bg-overlay">
            <div className="flex h-full w-full justify-center items-center ">
                <AiOutlineLoading3Quarters className="animate-spin" fill="#ffffff" fontSize={60} />
            </div>
        </div>
    );
};

export default Loading;
