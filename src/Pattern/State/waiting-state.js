const { PAYMENT_SECRET_KEY, PROTOTYPE, DOMAIN, FE_PORT } = require('./../../Config');
const QRCode = require('qrcode');
const stripe = require('stripe')(PAYMENT_SECRET_KEY);
const { status, expire } = require('./../../Constant');
const {
    convertParticularTimeStringToDate,
    convertStringToDate,
    FormatData,
} = require('./../../Utils');
const { cartService, orderService } = require('./../../Service');

class WaitingState {
    constructor(paymentThirdParty) {
        this.paymentThirdParty = paymentThirdParty;
    }

    execPayment = async (payload) => {
        try {
            const {
                cartId,
                data,
            } = payload;
            // lấy domain
            const domain = `${PROTOTYPE}://${DOMAIN}:${FE_PORT}/payment`;
            // lấy hết thông tin sản phẩm trong giỏ hàng
            const { cart: unhandleCart } = await cartService.getCart(cartId);
            // kiểm tra thông tin sản phẩm
            let handledCart = unhandleCart.goods.map((goods) => {
                let { _id: goodsInfo, quantity } = goods;
                const { _id, name, price, product } = goodsInfo;
                // kiểm tra nếu số lượng mua lớn hơn số lượng sẵn có
                if (quantity > product) {
                    if (product === 0) {
                        // xóa sản phẩm ra khỏi giỏ hàng
                        return null;
                    } else {
                        quantity = product;
                    }
                }
                return {
                    _id,
                    name,
                    price,
                    quantity
                }
            })
            //filter lại các hàng hóa bị xóa khỏi cart
            handledCart = handledCart.filter((goods) => goods !== null);
            if (handledCart.length === 0) {
                throw new Error('all of your product was on out selling state', {
                    cause: status.BAD_REQUEST
                })
            }
            // tạo 1 session chứa thông tin các sản phẩm thanh toán
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: handledCart.map((goods) => {
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: goods.name
                            },
                            unit_amount: goods.price
                        },
                        quantity: goods.quantity
                    }
                }),
                expires_at: convertStringToDate(expire.UN_PAY),
                success_url: `${domain}/success`,
                cancel_url: `${domain}/failure`,
            })
            // tạo QR code liên hết với ngân hàng thanh toán
            const { url } = session;
            if (!url) {
                throw new Error('something occur with payment server', {
                    cause: status.INTERNAL_ERROR
                })
            }
            const qrCode = await QRCode.toDataURL(url);
            // tạo 1 order với trạng thái waiting
            const {
                timeReceive,
                studentId,
                studentName
            } = data;

            const _timeReceive = convertParticularTimeStringToDate(timeReceive);
            const { order } = await orderService.createWaitingOrder(
                {
                    studentId,
                    studentName
                },
                _timeReceive,
                handledCart,
                qrCode
            )

            // chuyển sang trạng thái pending đợi thanh toán
            this.paymentThirdParty.setState(this.paymentThirdParty.pendingState);
            return FormatData({ order, qrCode });
        } catch (err) {
            throw err;
        }
    }

    toString = () => {
        return 'WaitingState';
    }
}

module.exports = WaitingState;