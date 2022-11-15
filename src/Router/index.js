const authRouter = require('./auth-router');
const userRouter = require('./user-router');
const cartRouter = require('./cart-router');
const orderRouter = require('./order-router');
const revenueRouter = require('./revenue-router');

module.exports = function(app) {
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/user', userRouter);
    app.use('/api/v1/cart', cartRouter);
    app.use('/api/v1/order', orderRouter);
    app.use('/api/v1/revenue', revenueRouter);
}