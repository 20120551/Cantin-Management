const {receiveNoteRepository} = require('./../Database');
const {status} = require('./../Constant');
const {FormatData} = require('./../Utils');

const goodsService = {
    addNote: async(noteInfo) => {
        try {
            // thêm phiếu
            const receiveNote = await receiveNoteRepository.addNote({
                goods: noteInfo.goods,
                createAt: noteInfo.createAt,
                totalPrice: noteInfo.totalPrice
            });
            return FormatData({receiveNote});
        } catch(err) {
            throw err;
        }
    },

    getNoteById: async(id) => {
        try {
            let note = await receiveNoteRepository.getNoteById(id);
            if(!note) {
                throw new Error('Delivery note does not exist.', {
                    cause: status.BAD_REQUEST
                })
            }
            note = await note.populate('goods');
            return FormatData({note});
        } catch(err) {
            throw err;
        }
    },
    getNotesByDate: async(date) => {
        try {
            let notes = await receiveNoteRepository.getNotesByDate(date);
            if(!notes) {
                throw new Error('No notes found.', {
                    cause: status.BAD_REQUEST
                })
            }
            return FormatData({notes});
        } catch(err) {
            throw err;
        }
    },
    getStoreRoom: async() => {
        try {
            let storeroom = await receiveNoteRepository.getStoreRoom();
            if(!storeroom) {
                throw new Error('There no note in the store', {
                    cause: status.BAD_REQUEST
                })
            }
            return FormatData({storeroom});
        } catch(err) {
            throw err;
        }
    },
}

module.exports = goodsService;