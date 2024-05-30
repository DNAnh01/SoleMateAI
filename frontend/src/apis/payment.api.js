import configs from '~/configs';

const paymentApi = {
    initiatePayment: ({ vnp_Amount, vnp_TxnRef, vnp_OrderInfo }) =>
        `${configs.baseUrl.url}/payment/payment?vnp_Amount=${vnp_Amount}&vnp_TxnRef=${vnp_TxnRef}&vnp_OrderInfo=${vnp_OrderInfo}`,
};
export default paymentApi;
