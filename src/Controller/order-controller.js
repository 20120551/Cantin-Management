// import some service here
const { status, expire } = require('./../Constant');
const { convertStringToDate } = require('./../Utils');
const { orderService } = require('./../Service');

class OrderController {
    constructor(paymentThirdParty) {
        this.paymentThirdParty = paymentThirdParty;
    }
    createOrder = async (req, res, next) => {
        try {
            const _paymentThirdParty = this.paymentThirdParty.clone();
            const cartId = req.cart || req.cookies.cart;
            let payload = {
                cartId,
                data: req.body
            }
            const { order: waitingOrder, qrCode } = await _paymentThirdParty.execPayment(payload);
            // set cookie của cart và order với 10p kể từ thời điểm bắt đầu thanh toán
            const dateExpire = convertStringToDate(expire.UN_PAY);

            res.cookie('cart', cartId, {
                secure: false,
                httpOnly: true,
                sameSite: "strict",
                expires: dateExpire
            });

            res.cookie('order', waitingOrder.id, {
                secure: false,
                httpOnly: true,
                sameSite: "strict",
                expires: dateExpire
            });

            payload = {
                order: waitingOrder
            }
            const { order } = await _paymentThirdParty.execPayment(payload);
            res.status(status.OK).json({
                message: 'waiting for payment',
                data: {
                    order,
                    qrCode
                }
            })
        } catch (err) {
            next(err);
        }
    }
    getOrderById = async (req, res, next) => {
        try {
            const { orderId } = req.params;
            const { order } = await orderService.getOrder(orderId);
            res.status(status.OK).json({
                message: 'get order by id successfully',
                data: order
            })
        } catch (err) {
            next(err);
        }
    }
    getOrderByDate = async (req, res, next) => {
        try {
            const { date } = req.body;
            const { orders } = await orderService.getOrderByTime(date);
            res.status(status.OK).json({
                message: 'get order by id successfully',
                data: orders
            })
        } catch (err) {
            next(err);
        }
    }
    orderResult = async (req, res, next) => {
        try {
            const { result } = req.params;
            const cartId = req.cart || req.cookies.cart;
            const orderId = req.cookies.order;

            this.paymentThirdParty.setState(this.paymentThirdParty[`${result}State`]);
            const payload = {
                order: { _id: orderId },
                cart: { _id: cartId }
            }

            const { order } = await this.paymentThirdParty.execPayment(payload);

            // xóa cookie
            res.clearCookie('order');
            res.clearCookie('cart');

            res.status(status.OK).json({
                message: `order pay ${result}`,
                data: order
            })
        } catch (err) {
            next(err);
        }
    }
}

module.exports = OrderController;