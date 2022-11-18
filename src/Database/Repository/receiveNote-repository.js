const { ReceiveNote } = require('./../Model');
const { SideDish } = require('./../Model');
const { Goods } = require('./../Model');

const receiveNoteRepository = {
    getReceiveNotesBetweenAInterval: async (startDate, endDate) => {
        try {
            const receiveNotes = await ReceiveNote.find({
                createAt: {
                    $gte: startDate,
                    $lt: endDate
                }
            })
            return receiveNotes;
        } catch (err) {
            throw err;
        }
    },
    // Tạo phiếu mới
    addNote: async ({ goods, createAt, totalPrice }) => {
        try {

            for (let i = 0; i < goods.length; i++) {
                try {
                    let good = await Goods.findById(goods[i].goodsInfo);
                    if (good.type === 'sideDish') {
                        await SideDish.findByIdAndUpdate(good.goodsType, {
                            $inc: { capacity: parseInt(goods[i].quantity) }
                        }, { new: true });
                    }
                } catch (err) {
                    throw err;
                }
            }

            //generate note
            const note = new ReceiveNote({
                goods: goods,
                createAt: createAt,
                totalPrice: totalPrice
            });

            //save note in database 
            const result = await note.save();
            await result.populate({
                path: 'goods',
                populate: {
                    path: 'goodsInfo',
                    populate: { path: 'goodsType' }
                }
            });
            return result;
        } catch (err) {
            throw err;
        }
    },
    getNoteById: async (id) => {
        try {
            const note = await ReceiveNote.findById({ _id: id });
            await note.populate({
                path: 'goods',
                populate: {
                    path: 'goodsInfo',
                    populate: { path: 'goodsType' }
                }
            });
            return note;
        } catch (err) {
            throw err;
        }
    },
    getNotesByDate: async (startDate, endDate) => {
        try {
            const notes = await ReceiveNote.find({
                createAt: {
                    $gte: startDate,
                    $lt: endDate
                }
            });
            for (let i = 0; i < notes.length; i++) {
                await notes[i].populate({
                    path: 'goods',
                    populate: {
                        path: 'goodsInfo',
                        populate: { path: 'goodsType' }
                    }
                });
            }
            return notes;
        } catch (err) {
            throw err;
        }
    },
    getStoreRoom: async () => {
        try {
            const storeroom = await ReceiveNote.find({});
            for (let i = 0; i < storeroom.length; i++) {
                await storeroom[i].populate({
                    path: 'goods',
                    populate: {
                        path: 'goodsInfo',
                        populate: { path: 'goodsType' }
                    }
                });
            }
            return storeroom;
        } catch (err) {
            throw err;
        }
    },

}

module.exports = receiveNoteRepository;