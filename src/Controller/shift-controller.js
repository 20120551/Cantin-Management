const {status} = require('./../Constant');
const {shiftService} = require('./../Service');

class ShiftController {
    // [POST] /api/v1/shift/create
    add = async (req, res, next) => {
        try {
            //lấy thông tin hàng được gửi lên từ form
            const shiftInfo = req.body;

            // Tạo và thêm hàng hóa vào lưu trữ
            const shift = await shiftService.add(shiftInfo);

            //trả json về cho người dùng
            res.status(status.OK).json({
                message: 'Add shift successfully.',
                data: shift,
            });
        } catch (err) {
            next(err);
        }
    };
    // [GET] /api/v1/shift/
    getAll = async(req, res, next) => {
        try {
            const {shifts} = await shiftService.getAll();
            res.status(status.OK).json({
                message: 'get shifts sucessfully',
                data: shifts
            })
        } catch(err) {
            next(err);
        }
    };
}

module.exports = ShiftController;