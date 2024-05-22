const { default: useAppStore } = require('~/store');

const Overlay = () => {
    const { isShowOverlay } = useAppStore();
    if (!isShowOverlay) {
        return <></>;
    }
    return <div className="fixed top-0 bottom-0 left-0 right-0 z-[10000] bg-transparent"></div>;
};

export default Overlay;
