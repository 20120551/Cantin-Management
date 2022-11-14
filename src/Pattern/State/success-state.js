const { FormatData, sendingMail } = require('../../Utils');
const {orderService, cartService} = require('./../../Service');

class SuccessState {
    constructor(paymentThirParty) {
        this.paymentThirParty = paymentThirParty;
    }

    execPayment = async(payload) => {
        try {
            const {
                order,
                cart
            } = payload;
            // cập nhật lại trạng thái của order
            const {
                _id: orderId
            } = order;
            const {order: updatedOrder} = await orderService.updateOrderState(orderId, 'success');
            // gửi email thông báo thanh toán thành công cho khách hàng
            await sendingMail(updatedOrder, 'PAYMENT');
            // xóa thông tin giỏ hàng
            const {
                _id: cartId
            } = cart;
            await cartService.removeCart(cartId);
            // trả về trạng thía đầu
            this.paymentThirParty.setState(this.paymentThirParty.waitingState);
            // thông báo về client thanh toán thành công
            return FormatData({order: updatedOrder});
        } catch(err) {
            throw err;
        }
    }

    toString = () => {
        return 'SuccessState';
    }
}

module.exports = SuccessState;