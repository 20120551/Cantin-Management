const { receiveNoteService } = require('../Service');
const { status } = require('../Constant');

class ReceiveNoteController {
    // [GET] /api/v1/receive/storeroom
    getStoreRoom = async (req, res, next) => {
        try {
            const { storeRoom } = await receiveNoteService.getStoreRoom();

            res.status(status.OK).json({
                message: 'Get all notes from storeroom successfully.',
                data: storeRoom,
            })
        } catch (err) {
            next(err);
        }
    }

    // [POST] /api/v1/receive/addNote
    addNote = async (req, res, next) => {
        try {
            //lấy thông tin hàng được gửi lên từ form
            const noteInfo = req.body;

            // Tạo và thêm hàng hóa vào lưu trữ
            const { receiveNote } = await receiveNoteService.addNote(noteInfo);

            //trả json về cho người dùng
            res.status(status.OK).json({
                message: 'Add note successfully.',
                data: receiveNote,
            });
        } catch (err) {
            next(err);
        }
    }

    // [GET] /api/v1/receive/:id
    getNoteByID = async (req, res, next) => {
        try {
            //lấy thông tin hàng được gửi lên từ form
            const _id = req.params.id;

            // Tạo và thêm hàng hóa vào lưu trữ
            const { note } = await receiveNoteService.getNoteById(_id);

            //trả json về cho người dùng
            res.status(status.OK).json({
                message: 'Get note infomation successfully.',
                data: note,
            });
        } catch (err) {
            next(err);
        }
    }

    // [GET] /api/v1/receive/update/:id
    getNotesByDate = async (req, res, next) => {
        try {
            const date = req.body.date;

            const { notes } = await receiveNoteService.getNotesByDate(date);

            res.status(status.OK).json({
                message: 'Get notes information successfully',
                data: notes,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ReceiveNoteController;