// import some service here
const {status, expire} = require('./../Constant');
const {convertStringToDate} = require('./../Utils');

class OrderController {
    constructor(paymentThirdParty) {
        this.paymentThirdParty = paymentThirdParty;
    }
    createOrder = async(req, res, next) => {
        try {
            const cartId = req.cart || req.cookies.cart;
            let payload = {
                cartId,
                data: req.body
            }
            const {order: waitingOrder, qrCode} = await this.paymentThirdParty.execPayment(payload);
            // set cookie của cart và order với 10p kể từ thời điểm bắt đầu thanh toán
            const dateExpire = convertStringToDate(expire.UN_PAY);

            res.cookie('cart', cartId, {
                secure: false,
                httpOnly: true,
                sameSite: "strict",
                expires: dateExpire
            });

            res.cookie('order', waitingOrder._id, {
                secure: false,
                httpOnly: true,
                sameSite: "strict",
                expires: dateExpire
            });

            payload = {
                order: waitingOrder
            }
            const {order} = await this.paymentThirdParty.execPayment(payload);
            res.status(status.OK).json({
                message: 'waiting for payment',
                data: {
                    order,
                    qrCode
                }
            })
        } catch(err) {
            next(err);
        }
    }
    orderResult = async(req, res, next) => {
        try {
            const {result} = req.params;
            const cartId = req.cart || req.cookies.cart;
            const orderId = req.cookies.order;

            this.paymentThirdParty.setState(this.paymentThirdParty[`${result}State`]);
            const payload = {
                order: {_id: orderId},
                cart: {_id: cartId}
            }

            const {order} = await this.paymentThirdParty.execPayment(payload);

            // xóa cookie
            res.clearCookie('order');
            res.clearCookie('cart');

            res.status(status.OK).json({
                message: `order pay ${result}`,
                data: order
            })
        } catch(err) {
            next(err);
        }
    }
}

module.exports = OrderController;