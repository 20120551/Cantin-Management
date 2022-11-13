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
    }
}

module.exports = goodsRepository;