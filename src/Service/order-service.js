// import some repository here
const {status} = require('./../Constant');
const { FormatData } = require('../Utils');
const {orderRepository} = require('./../Database');

const orderService = {
    createWaitingOrder: async(studentInfo, timeReceive, goods) => {
        try {
            let order = await orderRepository.createWaitingOrder(studentInfo, timeReceive, goods);
            order = await order.populate('goods._id');
            return FormatData({order});
        } catch(err) {
            throw err;
        }
    },
    getOrder: async(orderId) => {
        try {
            let order = await orderRepository.getOrderById(orderId);
            if(!order) {
                throw new Error('order does not exist', {
                    cause: status.BAD_REQUEST
                })
            }
            order = await order.populate('goods._id');
            return FormatData({order});
        } catch(err) {
            throw err;
        }
    },
    updateOrderState: async(orderId, state) => {
        try {
            let order = await orderRepository.updateOrderState(orderId, state);
            if(!order) {
                throw new Error('order does not exist', {
                    cause: status.BAD_REQUEST
                })
            }
            order = await order.populate('goods._id');
            return FormatData({order});
        } catch(err) {
            throw err;
        }
    },
    deleteOrder: async(orderId) => {
        try {
            let order = await orderRepository.deleteOrder(orderId);
            if(!order) {
                throw new Error('order does not exist', {
                    cause: status.BAD_REQUEST
                })
            }
            order = await order.populate('goods._id');
            return FormatData({order});
        } catch(err) {
            throw err;
        }
    }
}

module.exports = orderService;