const {goodsRepository} = require('./../Database');
const {mainDishRepository} = require('./../Database');
const {sideDishRepository} = require('./../Database');
const {status} = require('./../Constant');
const {FormatData} = require('./../Utils');

const goodsService = {
    addGood: async(goodInfo) => {
        try {
            let _dishType;
            if (goodInfo.type === 'mainDish')
            {
                //tạo mặc định 1 main dish
                _dishType =  await mainDishRepository.createDefault();
            }
            else
            {
                //tạo mặc định 1 side dish
                _dishType =  await sideDishRepository.createDefault();
            }

            // thêm hàng
            const good = await goodsRepository.addGood({
                name: goodInfo.name,
                image: goodInfo.image,
                price: goodInfo.price,
                product: goodInfo.product,
                type: goodInfo.type,
                goodsType: _dishType
            });

            return FormatData({good});
        } catch(err) {
            throw err;
        }
    },
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
    getStoreRoom: async() => {
        try {
            let goods = await goodsRepository.getStoreRoom();
            if(!goods) {
                throw new Error('There no goods in the store', {
                    cause: status.BAD_REQUEST
                })
            }
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