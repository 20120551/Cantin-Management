const {Goods} = require('./../Model');

const goodsRepository = {
    // Tạo hàng mới
    addGood: async({name, image, price, product, type, goodsType})=> {
        try {
            //generate user
            const good = new Goods({
                name: name,
                image: image,
                price: price,
                product: product,
                type: type,
                goodsType: goodsType
            });

            //save user in database 
            const result = await good.save();
            return result;
        } catch(err) {
            throw err;
        }
    },
    getGoodsById: async(id) => {
        try {
            const goods = await Goods.findById({_id: id});
            return goods;
        } catch(err) {
            throw err;
        }
    },
    getStoreRoom: async(id) => {
        try {
            const goods = await Goods.find({});
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