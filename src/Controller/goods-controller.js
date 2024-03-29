const { goodsService } = require('../Service');
const { status } = require('../Constant');

class GoodsController {
    // [GET] /api/v1/goods/storeroom
    getStoreRoom = async (req, res, next) => {
        try {
            const { storeRoom } = await goodsService.getStoreRoom();

            res.status(status.OK).json({
                message: 'Get all goods from storeroom successfully.',
                data: storeRoom,
            })
        } catch (err) {
            next(err);
        }
    }

    // [POST] /api/v1/goods/addGood
    addGood = async (req, res, next) => {
        try {
            //lấy thông tin hàng được gửi lên từ form
            const goodInfo = req.body;

            // Tạo và thêm hàng hóa vào lưu trữ
            const { good } = await goodsService.addGood(goodInfo);

            //trả json về cho người dùng
            res.status(status.OK).json({
                message: 'Add good successfully.',
                data: good,
            });
        } catch (err) {
            next(err);
        }
    }

    // [GET] /api/v1/goods/:id
    getGoodByID = async (req, res, next) => {
        try {
            //lấy thông tin hàng được gửi lên từ form
            const _id = req.params.id;

            // Tạo và thêm hàng hóa vào lưu trữ
            const { goods } = await goodsService.getGoodsById(_id);

            //trả json về cho người dùng
            res.status(status.OK).json({
                message: 'Get good infomation successfully.',
                data: goods,
            });
        } catch (err) {
            next(err);
        }
    }

    // [GET] /api/v1/goods/type/:dishType
    getGoodsByType = async (req, res, next) => {
        try {
            //lấy thông tin hàng được gửi lên từ form
            const _dishType = req.params.dishType;

            // Tạo và thêm hàng hóa vào lưu trữ
            const { goods } = await goodsService.getGoodsByType(_dishType);

            //trả json về cho người dùng
            res.status(status.OK).json({
                message: 'Get good infomation successfully.',
                data: goods,
            });
        } catch (err) {
            next(err);
        }
    }

    // [POST] /api/v1/goods/:id
    updateGoodByID = async (req, res, next) => {
        try {
            const _id = req.params.id;

            const { good } = await goodsService.updateGoodByID(_id, req.body);

            res.status(status.OK).json({
                message: 'Update good information successfully',
                data: good,
            });
        } catch (err) {
            next(err);
        }
    }

    // [POST] /api/v1/goods/:id
    deleteGoodByID = async (req, res, next) => {
        try {
            const _id = req.params.id;

            const { good } = await goodsService.deleteGoodByID(_id);

            res.status(status.OK).json({
                message: 'Delete good successfully.',
                data: good,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = GoodsController;