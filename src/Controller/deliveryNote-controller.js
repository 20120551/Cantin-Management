const {deliveryNoteService} = require('../Service');
const {status} = require('../Constant');

class DeliveryNoteController {
    // [GET] /api/v1/delivery/storeroom
    getStoreRoom = async(req, res, next) => {
        try {
            const storeRoom = await deliveryNoteService.getStoreRoom();

            res.status(status.OK).json({
                message: 'Get all notes from storeroom successfully.',
                data: storeRoom,
            })
        } catch(err) {
            next(err);
        }
    }

    // [POST] /api/v1/delivery/addNote
    addNote = async(req, res, next) => {
        try{
            //lấy thông tin hàng được gửi lên từ form
            const noteInfo = req.body;

            // Tạo và thêm hàng hóa vào lưu trữ
            const newNote = await deliveryNoteService.addNote(noteInfo);

            //trả json về cho người dùng
            res.status(status.OK).json({
                message: 'Add note successfully.',
                data: newNote,
            });
        }catch(err) {
            next(err);
        }
    }

    // [GET] /api/v1/delivery/:id
    getNoteByID = async(req, res, next) => {
        try{
            //lấy thông tin hàng được gửi lên từ form
            const _id = req.params.id;

            // Tạo và thêm hàng hóa vào lưu trữ
            const good = await deliveryNoteService.getNoteById(_id);

            //trả json về cho người dùng
            res.status(status.OK).json({
                message: 'Get note infomation successfully.',
                data: good,
            });
        }catch(err) {
            next(err);
        }
    }

    // [GET] /api/v1/delivery/many/:date
    getNotesByDate = async(req, res, next) => {
        try {
            const date = req.params.date;
 
            const good = await deliveryNoteService.getNotesByDate(date);

            res.status(status.OK).json({
                message: 'Get notes information successfully',
                data: good,
            });
        } catch(err) {
            next(err);
        }
    }
}

module.exports = DeliveryNoteController;