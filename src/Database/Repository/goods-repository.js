const {Goods} = require('./../Model');
const {MainDish} = require('./../Model');
const {SideDish} = require('./../Model');

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
    updateGoodByID: async(_id, goodInfo)=>{
        try {
            let good = await Goods.findById({_id: _id});
            let goodsType;
            if (goodInfo.type === "mainDish")
            {
                goodsType = await MainDish.findById({_id: good.goodsType});
            }
            else
            {
                goodsType = await SideDish.findById({_id: good.goodsType});
            }

            // deep copy goodsType
            Object.assign(goodsType, goodInfo.goodsType);

            await goodsType.save();

            goodInfo.goodsType = good.goodsType;
            // deep copy goodsType
            Object.assign(good, goodInfo);

            const result = await good.save();
            result.goodsType = goodsType;
            return result;
        } catch(err) {
            throw err;
        }
    },
    getStoreRoom: async() => {
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