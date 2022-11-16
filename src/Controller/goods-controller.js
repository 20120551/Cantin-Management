const {goodsService} = require('../Service');
const {status} = require('../Constant');

class GoodsController {
    // [GET] /api/v1/goods/storeroom
    getStoreRoom = async(req, res, next) => {
        try {
            const storeRoom = await goodsService.getStoreRoom();
            console.log('controller');
            console.log(storeRoom);

            res.status(status.OK).json({
                message: 'Get all goods from storeroom successfully.',
                data: storeRoom,
            })
        } catch(err) {
            next(err);
        }
    }

    // [POST] /api/v1/goods/addGood
    addGood = async(req, res, next) => {
        try{
            //lấy thông tin hàng được gửi lên từ form
            const goodInfo = req.body;

            // Tạo và thêm hàng hóa vào lưu trữ
            const newGood = await goodsService.addGood(goodInfo);

            //trả json về cho người dùng
            res.status(status.OK).json({
                message: 'Add good successfully.',
                data: newGood,
            });
        }catch(err) {
            next(err);
        }
    }
}

module.exports = GoodsController;