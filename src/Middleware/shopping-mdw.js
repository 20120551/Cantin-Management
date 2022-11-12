const {status, expire} = require('./../Constant');
const {cartRepository} = require('./../Database');
const {convertStringToDate} = require('./../Utils');

const Schedule = require('./../Schedule');
const schedule = new Schedule();

const shoppingMDW = {
    addCookieAutomatically: async(req, res, next) => {
        try {
            const cartId = req.cookies.cart;
            if (cartId) {
                return next();
            }

            const cart = await cartRepository.createCart();
            // expire cookie automatically after 30m
            const expireCookieDate = convertStringToDate(expire.CART_COOKIE);

            res.cookie('cart', cart._id, {
                secure: false,
                httpOnly: true,
                sameSite: "strict",
                expires: expireCookieDate
            })

            // remove cart automatically after the particular time by using node-schedule
            schedule.expireCart(expireCookieDate ,cart._id);

            req.cart = cart._id;
            next();
        } catch(err) {
            res.status(status.BAD_REQUEST).json({
                message: err.message
            });
        }
    }
}

module.exports = shoppingMDW;