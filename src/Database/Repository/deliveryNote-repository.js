const { DeliveryNote } = require('./../Model');
const { Goods } = require('./../Model');
const { SideDish } = require('./../Model');

const deliveryRepository = {
    // Tạo phiếu mới
    addNote: async ({ goods, createAt }) => {
        try {

            for (let i = 0; i < goods.length; i++) {
                try {
                    let good = await Goods.findByIdAndUpdate(goods[i].goodsInfo, {
                        $set: { price: goods[i].price },
                        $inc: { product: parseInt(goods[i].quantity) }
                    }, { new: true });
                    if (good.type === 'sideDish') {
                        await SideDish.findByIdAndUpdate(good.goodsType, {
                            $inc: { capacity: -parseInt(goods[i].quantity) }
                        }, { new: true });
                    }
                }
                catch (err) {
                    throw err;
                }
            }

            //generate note
            const note = new DeliveryNote({
                goods: goods,
                createAt: createAt
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
            const note = await DeliveryNote.findById({ _id: id });
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
            const notes = await DeliveryNote.find({
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
            const storeroom = await DeliveryNote.find({});
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

module.exports = deliveryRepository;