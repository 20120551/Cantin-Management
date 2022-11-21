// import some repository here
const { status, restrict } = require('./../Constant');
const { FormatData } = require('../Utils');
const { orderRepository } = require('./../Database');
const { convertParticularTimeStringToDate } = require('./../Utils');

const orderService = {
    createWaitingOrder: async (studentInfo, timeReceive, goods, qrCode) => {
        try {
            let order = await orderRepository.createWaitingOrder(studentInfo, timeReceive, goods, qrCode);
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
            const times = restrict.CLOSE_STORE.split('-');
            const startDate = convertParticularTimeStringToDate(times[1], new Date(date));
            const endDate = convertParticularTimeStringToDate(times[0], new Date(date));

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