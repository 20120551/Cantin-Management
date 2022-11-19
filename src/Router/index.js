const authRouter = require('./auth-router');
const userRouter = require('./user-router');
const cartRouter = require('./cart-router');
const orderRouter = require('./order-router');
const revenueRouter = require('./revenue-router');
const bStasticRouter = require('./bStatitstic-router');
const goodsRouter = require('./goods-router');
const deliveryNoteRouter = require('./deliveryNote-router');
const receiveNoteRouter = require('./receiveNote-router');
const scheduleRouter = require('./schedule-router');
const shiftRouter = require('./shift-router');
const timeKeepingRouter = require('./timeKeeping-router');

module.exports = function(app) {
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/user', userRouter);
    app.use('/api/v1/cart', cartRouter);
    app.use('/api/v1/order', orderRouter);
    app.use('/api/v1/revenue', revenueRouter);
    app.use('/api/v1/statistic', bStasticRouter);
    app.use('/api/v1/goods', goodsRouter);
    app.use('/api/v1/delivery', deliveryNoteRouter);
    app.use('/api/v1/receive', receiveNoteRouter);
    app.use('/api/v1/schedule', scheduleRouter);
    app.use('/api/v1/shift', shiftRouter);
    app.use('/api/v1/timeKeeping', timeKeepingRouter);
}