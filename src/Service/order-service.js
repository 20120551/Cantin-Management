// import some repository here
const { status } = require('./../Constant');
const { FormatData } = require('../Utils');
const { orderRepository } = require('./../Database');
const { convertParticularTimeStringToDate } = require('./../Utils');

const orderService = {
    createWaitingOrder: async (studentInfo, timeReceive, goods) => {
        try {
            let order = await orderRepository.createWaitingOrder(studentInfo, timeReceive, goods);
            order = await order.populate('goods._id');
            return FormatData({ order });
        } catch (err) {
            throw err;
        }
    },
    getOrder: async (orderId) => {
        try {
            let order = await orderRepository.getOrderById(orderId);
            if (!order) {
                throw new Error('order does not exist', {
                    cause: status.BAD_REQUEST
                })
            }
            order = await order.populate('goods._id');
            return FormatData({ order });
        } catch (err) {
            throw err;
        }
    },
    getOrderByTime: async (date) => {
        try {
            const startDate = convertParticularTimeStringToDate('7h 30m', new Date(date));
            const endDate = convertParticularTimeStringToDate('19h 30m', new Date(date));

            const orders = await orderRepository.getOrderBetweenAInterval(startDate, endDate);
            if (!orders) {
                throw new Error('orders was not found on this day', {
                    cause: status.BAD_REQUEST
                })
            }
            return FormatData({ orders });
        } catch (err) {
            throw err;
        }
    },
    updateOrderState: async (orderId, state) => {
        try {
            let order = await orderRepository.updateOrderState(orderId, state);
            if (!order) {
                throw new Error('order does not exist', {
                    cause: status.BAD_REQUEST
                })
            }
            order = await order.populate('goods._id');
            return FormatData({ order });
        } catch (err) {
            throw err;
        }
    },
    deleteOrder: async (orderId) => {
        try {
            let order = await orderRepository.deleteOrder(orderId);
            if (!order) {
                throw new Error('order does not exist', {
                    cause: status.BAD_REQUEST
                })
            }
            order = await order.populate('goods._id');
            return FormatData({ order });
        } catch (err) {
            throw err;
        }
    }
}

module.exports = orderService;