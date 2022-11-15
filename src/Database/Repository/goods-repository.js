const {Goods} = require('./../Model');

const goodsRepository = {
    getGoodsById: async(id) => {
        try {
            const goods = await Goods.findById({_id: id});
            return goods;
        } catch(err) {
            throw err;
        }
    },
    updateProductAmountOnSell: async(id, amount) => {
        try {
            const goods = await Goods.findOneAndUpdate({_id: id}, {
                $inc: {
                    product: -amount
                }
            }, {new: true});
            return goods;
        } catch(err) {
            throw err;
        }
    },
    resetProductOfMainDish: async() => {
        try {
            await Goods.updateMany({type: 'mainDish'}, {
                $set: {
                    product: 0
                }
            })
        } catch(err) {
            throw err;
        }
    }
}

module.exports = goodsRepository;