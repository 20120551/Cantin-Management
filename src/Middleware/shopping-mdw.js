const {status, expire, restrict} = require('./../Constant');
const {cartRepository, goodsRepository} = require('./../Database');
const {convertStringToDate, convertParticularTimeStringToDate} = require('./../Utils');

const Schedule = require('./../Schedule');
const schedule = new Schedule();

const shoppingMDW = {
    preventUserOnRushHour: async(req, res, next) => {
        try {
            // lấy thời gian hiện tại
            const [startRushHour, endRushHour] = restrict.rushHour.split('-');
            const startTime = convertParticularTimeStringToDate(startRushHour);
            const endTime = convertParticularTimeStringToDate(endRushHour);
            const currentTime = new Date();

            console.log(startTime, currentTime, endTime);

            // kiểm tra thời gian hiện tại có nằm trong giờ cao điểm không
            // giờ cao điểm từ 10h30 - 13h30
            if(currentTime < startTime || currentTime > endTime) {
                return next();
            }

            const {goodsId} = req.body;
            const goods = await goodsRepository.getGoodsById(goodsId);
            const {type} = goods;
            if(type === 'mainDish') {
                return res.status(status.UN_AUTHORIZED).json({
                    message: 'main dish just valid for buying between 7h00 to 10h30 and 13h30 to 15h30',
                    data: null
                })
            }
            next();
        } catch(err) {
            throw err;
        }
    },
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