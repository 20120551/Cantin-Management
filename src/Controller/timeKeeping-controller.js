const {status} = require('./../Constant');
const {timeKeepingService} = require('./../Service');

class TimeKeepingController {
    // [GET] /api/v1/timeKeeping/:id

    getStaffTK = async (req, res, next) => {
        try {
            //lấy thông tin hàng được gửi lên từ form
            const userId = req.params.id;

            // Tạo và thêm hàng hóa vào lưu trữ
            const timeKeeping = await timeKeepingService.getStaffTK(userId);

            //trả json về cho người dùng
            res.status(status.OK).json({
                message: 'get time keeping successfully.',
                data: timeKeeping,
            });
        } catch (err) {
            next(err);
        }
    };
    // [POST] /api/v1/timeKeeping/check
    check = async(req, res, next) => {
        try {
            const info = req.body;
            const {timeKeeping} = await timeKeepingService.check(info);
            res.status(status.OK).json({
                message: 'get time keeping sucessfully',
                data: timeKeeping
            })
        } catch(err) {
            next(err);
        }
    };
}

module.exports = TimeKeepingController;