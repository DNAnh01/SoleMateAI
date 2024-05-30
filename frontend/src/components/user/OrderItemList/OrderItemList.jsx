import OrderItem from '~/components/user/OrderItem';
import PropTypes from 'prop-types';

const OrderItemList = ({ orders }) => {
    return (
        <div>
            {orders.length === 0 ? (
                <div>Bạn không có đơn hàng nào.</div>
            ) : (
                orders?.map((order) => <OrderItem key={order.id} order={order} />)
            )}
        </div>
    );
};

OrderItemList.propTypes = {
    orders: PropTypes.array,
};

OrderItemList.defaultProps = {
    orders: [],
};

export default OrderItemList;
