const {goodsRepository} = require('./../Database');
const {status} = require('./../Constant');
const {FormatData} = require('./../Utils');

const goodsService = {
    getGoodsById: async(id) => {
        try {
            let goods = await goodsRepository.getGoodsById(id);
            if(!goods) {
                throw new Error('goods does not exist', {
                    cause: status.BAD_REQUEST
                })
            }
            goods = await goods.populate('goodsType');
            return FormatData({goods});
        } catch(err) {
            throw err;
        }
    },
    updateProductAmountOnSell: async(id, product) => {
        try {
            let goods = await goodsRepository.updateProductAmountOnSell(id, product);
            if(!goods) {
                throw new Error('goods does not exist', {
                    cause: status.BAD_REQUEST
                })
            }
            return FormatData({goods});
        } catch(err) {
            throw err;
        }
    },
    resetProductOfMainDish: async() => {
        try {
            await goodsRepository.resetProductOfMainDish();
        } catch(err) {
            throw err;
        }
    }
}

module.exports = goodsService;