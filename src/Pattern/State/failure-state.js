const {cartService, orderService, goodsService } = require('./../../Service');
const {FormatData} = require('./../../Utils');

class FailureState {
    constructor(paymentThirParty) {
        this.paymentThirParty = paymentThirParty;
    }

    execPayment = async(payload) => {
        try {
            const {
                order,
                cart
            } = payload;
            // phục hồi số lượng sản phẩm lại như ban đầu
            const {
                _id: orderId,
            } = order;
            // lấy thông tin của order để phục hồi
            const {goods} = await orderService.getOrder(orderId);
            goods.forEach(async(goods)=>{
                const {
                    _id: goodsId,
                    quantity
                } = goods;
                await goodsService.updateProductAmountOnSell(goodsId, -quantity);
            })
            // xóa phiếu order
            const {updatedOrder} = await orderService.deleteOrder(orderId);
            updatedOrder.state = 'failure';
            // xóa thông tin giỏ hàng
            const {
                _id: cartId
            } = cart;
            await cartService.removeCart(cartId);
            // trả về trạng thái đầu
            this.paymentThirParty.setState(this.paymentThirParty.waitingState);
            // thông báo về client thanh toán thất bại
            return FormatData({order: updatedOrder});
        } catch(err) {
            throw err;
        }
    }

    toString = () => {
        return 'FailureState';
    }
}

module.exports = FailureState;