import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';
const ProductSelect = ({ data, mode, onClickButton }) => {
    if (mode === 'select') {
        return (
            <div className="flex gap-2 p-2 justify-around rounded-lg border items-center">
                <div>
                    <img src={data?.image_url} alt={data?.shoe_name} className="w-[60px]" />
                </div>
                <div>
                    <img src={data?.brand?.brand_logo} alt={data?.brand?.brand_name} className="w-[50px]" />
                </div>
                <div className="text-center">
                    <h4>{data?.shoe_name}</h4>
                    <h6 className=" text-red-500 text-sm line-through font-semibold">{data?.display_price}</h6>
                    <h6 className="font-semibold text-sm">{data?.discounted_price}</h6>
                </div>
                <div>
                    <button
                        onClick={onClickButton}
                        className="hover:bg-red-500 p-1 rounded-md hover:text-white text-red-500"
                    >
                        <MdOutlineCancel fontSize={24} />
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="flex gap-2 p-2 justify-around rounded-lg border items-center">
            <div>
                <img src={data?.image_url} alt={data?.shoe_name} className="w-[60px]" />
            </div>
            <div>
                <img src={data?.brand?.brand_logo} alt={data?.brand?.brand_name} className="w-[50px]" />
            </div>
            <div className="text-center">
                <h4>{data?.shoe_name}</h4>
                <h6 className="font-semibold text-sm">{data?.display_price}</h6>
            </div>
            <div>
                <button onClick={onClickButton} className="hover:bg-slate-800 p-1 rounded-md hover:text-white">
                    <IoIosAddCircleOutline fontSize={24} />
                </button>
            </div>
        </div>
    );
};

export default ProductSelect;
