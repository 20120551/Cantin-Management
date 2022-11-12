// import some model here
const {Cart} = require('./../Model');

const cartRepository = {
    createCart: async() => {
        try {
            const cart = new Cart({});
            const result = await cart.save();
            return result;
        } catch(err) {
            throw err;
        } 
    },
    getCartById: async(id) => {
        try {
            const cart = await Cart.findById({_id: id});
            return cart;
        } catch(err) {
            throw err;
        }
    },
    addGoodsToCart: async(id, goods) => {
        const {
            goodsId,
            quantity
        } = goods;
        try {
            const cart = await Cart.findOneAndUpdate({_id: id}, {
                $push: {
                    goods: {
                        _id: goodsId,
                        quantity
                    }
                }
            }, {new: true});
            
            return cart;
        } catch(err) {
            throw err;
        }
    },
    updateGoodsOnCart: async(id, goods) => {
        const {
            goodsId,
            quantity
        } = goods;
        try {
            const cart = await Cart.findOneAndUpdate({_id: id}, {
                $set: {
                    'goods.$[elem].quantity': quantity
                }
            }, {
                arrayFilters: [{
                    'elem._id': goodsId
                }],
                new: true
            });
            return cart;
        } catch(err) {
            throw err;
        }
    },
    removeGoodsFromCart: async(id, goodsId) => {
        try {
            const cart = await Cart.findOneAndUpdate({_id: id}, {
                $pull: {
                    goods: {
                        _id: goodsId
                    }
                }
            },{
                new: true
            });
            
            return cart;
        } catch(err) {
            throw err;
        }
    },
    removeCart: async(id) => {
        try {
            await Cart.deleteOne({_id: id});
        } catch(err) {
            throw err;
        }
    }
}

module.exports = cartRepository;