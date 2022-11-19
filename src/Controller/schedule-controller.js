const {status} = require('./../Constant');
const {scheduleService} = require('./../Service');

class ScheduleController {
    // [POST] /api/v1/schedule/newAssignment
    assignment = async (req, res, next) => {
        try {
            //lấy thông tin hàng được gửi lên từ form
            const assignmentInfo = req.body;

            // Tạo và thêm hàng hóa vào lưu trữ
            const assignment  = await scheduleService.assignment(assignmentInfo);

            //trả json về cho người dùng
            res.status(status.OK).json({
                message: 'Add assignment successfully.',
                data: assignment,
            });
        } catch (err) {
            next(err);
        }
    };
    // [GET] /api/v1/schedule/
    getAll = async(req, res, next) => {
        try {
            const {schedule} = await scheduleService.getAll();
            res.status(status.OK).json({
                message: 'get schedule sucessfully',
                data: schedule
            })
        } catch(err) {
            next(err);
        }
    };
    // [GET] /api/v1/schedule/month
    getMonth = async(req, res, next) => {
        try {
            const month = req.body.month;
            const year = req.body.year;
            const {schedule} = await scheduleService.getMonth(month, year);
            res.status(status.OK).json({
                message: 'get schedule sucessfully',
                data: schedule
            })
        } catch(err) {
            next(err);
        }
    };
    // [GET] /api/v1/schedule/date
    getDate = async(req, res, next) => {
        try {
            const date = new Date(req.body.date);
            const {schedule} = await scheduleService.getDate(date);
            res.status(status.OK).json({
                message: 'get schedule sucessfully',
                data: schedule
            })
        } catch(err) {
            next(err);
        }
    };
}

module.exports = ScheduleController;