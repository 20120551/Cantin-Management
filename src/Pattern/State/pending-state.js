const {orderService, goodsService} = require('./../../Service');
const {FormatData} = require('./../../Utils');

class PendingState {
    constructor(paymentThirParty) {
        this.paymentThirParty = paymentThirParty;
    }

    execPayment = async(payload) => {
        try {
            const {
                order
            } = payload;
            // update trạng thái của order
            const {
                _id: orderId,
                goods
            } = order;
    
            const {order: updatedOrder} = await orderService.updateOrderState(orderId, 'pending');
            // giảm số lượng sản phẩm đang bán
            goods.forEach(async(goods)=>{
                const {
                    _id: goodsId,
                    quantity
                } = goods;
                await goodsService.updateProductAmountOnSell(goodsId, quantity);
            })
            // có thời gian trong 10p để thực hiện thanh toán
            // nếu quá thời gian, chuyển sang trạng thái thanh toán thất bại -> thirdparty tự làm việc đó
            return FormatData({order: updatedOrder});
        } catch(err) {
            throw err;
        }
    }

    toString = () => {
        return 'PendingState';
    }
}

module.exports = PendingState;