const {status, expire, restrict} = require('./../Constant');
const {cartRepository, goodsRepository} = require('./../Database');
const {
    convertStringToDate, 
    convertParticularTimeStringToDate,
    RelativeOfCurrentDayAndScheduleDay
} = require('./../Utils');

const Schedule = require('./../Schedule');
const schedule = new Schedule();

const shoppingMDW = {
    preventUserOnRushHour: async(req, res, next) => {
        try {
            // lấy thời gian hiện tại
            const currentTime = new Date();

            // thời gian đóng cửa hàng là 19h00-7h30 hôm sau
            const [startCloseStore, endCloseStore] = restrict.CLOSE_STORE.split('-');

            // khởi tạo 2 mốc
            let startcloseStoreTime = convertParticularTimeStringToDate(startCloseStore);
            let endcloseStoreTime = convertParticularTimeStringToDate(endCloseStore);
            // kiểm tra xem thời gian lên lịch là của ngày cũ hay ngày mới
            if(RelativeOfCurrentDayAndScheduleDay(endcloseStoreTime)) {
                // kiểm tra từ 0h00 - 7h30
                startcloseStoreTime = convertParticularTimeStringToDate('0h00');
            } else {
                // kiểm tra từ 19h30 - 23h59
                endcloseStoreTime = convertParticularTimeStringToDate('23h59');
            }
            // lấy ngày hôm sau, sau đó set lại lúc 7h30
            if(currentTime > startcloseStoreTime || currentTime < endcloseStoreTime) {
                return res.status(status.BAD_REQUEST).json({
                    message: 'Our store was closed, Please come back at 7h30 am',
                    data: null
                })
            }

            // Thời gian cho phép mua sản phẩm ăn nhanh 7h30-10h00 và 13h30-15h30
            const [morningShift, afternoonShift] = restrict.RUSH_HOUR.split(',');

            // ca sáng
            const [startMorningShift, endMorningShift] = morningShift.split('-');
            const startMorningShiftTime = convertParticularTimeStringToDate(startMorningShift);
            const endMorningShiftTime = convertParticularTimeStringToDate(endMorningShift);

            // ca chiều
            const [startAfternoonShift, endAfternoonShift] = afternoonShift.split('-');
            const startAfternoonShiftTime = convertParticularTimeStringToDate(startAfternoonShift);
            const endAfternoonShiftTime = convertParticularTimeStringToDate(endAfternoonShift);

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

            // Thời gian cho phép mua món nước 7h00 - 19h00
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