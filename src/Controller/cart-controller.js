// import some service
const { cartService } = require('../Service');
const { status } = require('../Constant');

class CartController {
    // [GET] /api/v1/cart
    getCart = async (req, res, next) => {
        try {
            const id = req.cart || req.cookies.cart;
            const { cart } = await cartService.getCart(id);
            res.status(status.OK).json({
                message: 'get all goods from cart successfully',
                data: cart,
            })
        } catch (err) {
            next(err);
        }
    }
    // [POST] /api/v1/cart
    addGoodsToCart = async (req, res, next) => {
        try {
            const id = req.cart || req.cookies.cart;
            const { cart } = await cartService.addGoodsToCart(id, req.body);

            res.status(status.OK).json({
                message: 'add goods to cart successfully',
                data: cart,
            })
        } catch (err) {
            next(err);
        }
    }
    // [POST] /api/v1/cart/:goodsId
    updateGoodsOnCart = async (req, res, next) => {
        try {
            const id = req.cart || req.cookies.cart;
            const { goodsId } = req.params;
            const goods = {
                goodsId,
                ...req.body
            }
            const { cart } = await cartService.updateGoodsOnCart(id, goods);

            res.status(status.OK).json({
                message: 'update goods on cart successfully',
                data: cart,
            })
        } catch (err) {
            next(err);
        }
    }
    // [PUT] /api/v1/cart/:goodsId
    removeGoodsFromCart = async (req, res, next) => {
        try {
            const id = req.cart || req.cookies.cart;
            const { goodsId } = req.params;
            const { cart } = await cartService.removeGoodsFromCart(id, goodsId);

            res.status(status.OK).json({
                message: 'remove goods from cart successfully',
                data: cart,
            })
        } catch (err) {
            next(err);
        }
    }
    // [DELETE] /api/v1/cart
    removeCart = async (req, res, next) => {
        try {
            const id = req.cart || req.cookies.cart;
            await cartService.removeCart(id);
            res.clearCookie("cart");
            res.clearCookie('order');

            res.status(status.OK).json({
                message: 'remove goods from cart successfully',
                data: null,
            })
        } catch (err) {
            next(err);
        }
    }
}

module.exports = CartController;