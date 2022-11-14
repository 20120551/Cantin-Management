const {status, expire, restrict} = require('./../Constant');
const {cartRepository, goodsRepository} = require('./../Database');
const {convertStringToDate, convertParticularTimeStringToDate} = require('./../Utils');

const Schedule = require('./../Schedule');
const schedule = new Schedule();

const shoppingMDW = {
    preventUserOnRushHour: async(req, res, next) => {
        try {
            // lấy các mốc thời gian cho phép đặt sản phẩm
            const [morningShift, afternoonShift] = restrict.rushHour.split(',');

            // ca sáng
            const [startMorningShift, endMorningShift] = morningShift.split('-');
            const startMorningShiftTime = convertParticularTimeStringToDate(startMorningShift);
            const endMorningShiftTime = convertParticularTimeStringToDate(endMorningShift);

            // ca chiều
            const [startAfternoonShift, endAfternoonShift] = afternoonShift.split('-');
            const startAfternoonShiftTime = convertParticularTimeStringToDate(startAfternoonShift);
            const endAfternoonShiftTime = convertParticularTimeStringToDate(endAfternoonShift);

            const currentTime = new Date();
            // kiểm tra thời gian hiện tại có nằm trong giờ cao điểm không
            // giờ cao điểm từ 10h30 - 13h30
            const isValidMorningShift = (currentTime >= startMorningShiftTime && currentTime <= endMorningShiftTime)
                ? true : false;
            const isValidAfternoonShift = (currentTime >= startAfternoonShiftTime && currentTime <= endAfternoonShiftTime)
                ? true : false;

            // kiểm tra nếu thời gian mua valid
            if(isValidMorningShift || isValidAfternoonShift) {
                return next();
            }

            // nếu không valid, kiểm tra là nước hay thức ăn chính
            const {goodsId} = req.body;
            const goods = await goodsRepository.getGoodsById(goodsId);
            const {type} = goods;
            if(type === 'mainDish') {
                return res.status(status.UN_AUTHORIZED).json({
                    message: `main dish just valid for buying between ${morningShift} and ${afternoonShift}`,
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