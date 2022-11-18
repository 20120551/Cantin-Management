const { deliveryNoteRepository } = require('./../Database');
const { status } = require('./../Constant');
const { FormatData, convertParticularTimeStringToDate } = require('./../Utils');

const goodsService = {
    addNote: async (noteInfo) => {
        try {
            // thêm phiếu
            const deliveryNote = await deliveryNoteRepository.addNote({
                goods: noteInfo.goods,
                createAt: noteInfo.createAt
            });
            return FormatData({ deliveryNote });
        } catch (err) {
            throw err;
        }
    },

    getNoteById: async (id) => {
        try {
            let note = await deliveryNoteRepository.getNoteById(id);
            if (!note) {
                throw new Error('Delivery note does not exist.', {
                    cause: status.BAD_REQUEST
                })
            }
            note = await note.populate('goods');
            return FormatData({ note });
        } catch (err) {
            throw err;
        }
    },
    getNotesByDate: async (date) => {
        try {
            const startDate = convertParticularTimeStringToDate('7h 30m', new Date(date));
            const endDate = convertParticularTimeStringToDate('19h 30m', new Date(date));
            let notes = await deliveryNoteRepository.getNotesByDate(startDate, endDate);
            if (!notes) {
                throw new Error('No notes found.', {
                    cause: status.BAD_REQUEST
                })
            }
            return FormatData({ notes });
        } catch (err) {
            throw err;
        }
    },
    getStoreRoom: async () => {
        try {
            let storeRoom = await deliveryNoteRepository.getStoreRoom();
            if (!storeRoom) {
                throw new Error('There no note in the store', {
                    cause: status.BAD_REQUEST
                })
            }
            return FormatData({ storeRoom });
        } catch (err) {
            throw err;
        }
    },
}

module.exports = goodsService;