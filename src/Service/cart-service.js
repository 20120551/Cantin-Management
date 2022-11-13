// import some repository here
const {status} = require('../Constant');
const {cartRepository} = require('../Database');
const {FormatData} = require('./../Utils');

const cartService = {
    // [GET] /api/v1/cart
    getCart: async(id) => {
        try {
            let cart = await cartRepository.getCartById(id);
            if(!cart) {
                throw new Error('Cart does not exist', {
                    cause: status.NOT_FOUND
                })
            }

            cart = await cart.populate('goods._id');
            return FormatData({
                cart
            })
        } catch(err) {
            throw err;
        }
    },
    // [POST] /api/v1/cart
    addGoodsToCart: async(id, goods) => {
        try {
            let cart = await cartRepository.addGoodsToCart(id, goods);
            if(!cart) {
                throw new Error('Cart does not exist', {
                    cause: status.BAD_REQUEST
                })
            }
            cart = await cart.populate('goods._id');
            return FormatData({
                cart
            })
        } catch(err) {
            throw err;
        }
    },
    // [PUT] /api/v1/cart/:goodsId
    updateGoodsOnCart: async(id, goods) => {
        try {
            let cart = await cartRepository.updateGoodsOnCart(id, goods);
            if(!cart) {
                throw new Error('Cart does not exist', {
                    cause: status.BAD_REQUEST
                })
            }
            cart = await cart.populate('goods._id');
            return FormatData({
                cart
            })
        } catch(err) {
            throw err;
        }
    },
    // [DELETE] /api/v1/cart/:goodsId
    removeGoodsFromCart: async(id, goodsId) => {
        let cart = await cartRepository.removeGoodsFromCart(id, goodsId);
        if(!cart) {
            throw new Error('Cart does not exist', {
                cause: status.BAD_REQUEST
            })
        }
        cart = await cart.populate('goods._id');
        return FormatData({
            cart
        })
    },
    // [DELETE] /api/v1/cart
    removeCart: async(id) => {
        try {
            await cartRepository.removeCart(id);
        } catch(err) {
            throw err;
        }
    },
}

module.exports = cartService;