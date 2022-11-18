// import some model here
const { Order } = require('./../Model');
const { makeid } = require('./../../Utils');

const orderRepository = {
    createWaitingOrder: async (studentInfo, timeReceive, goods) => {
        const {
            studentName,
            studentId
        } = studentInfo;
        try {
            const totalPrice = goods.reduce((prev, curr) => {
                return prev + curr.price * curr.quantity;
            }, 0);

            // kiểm tra id nếu có tồn tại hay chưa
            let _id = makeid('US', 5);
            let _order = await Order.findOne({ _id: _id });
            while (_order) {
                _id = makeid('US', 5);
                _order = await Order.findOne({ _id: _id });
            }

            const order = new Order({
                _id,
                goods,
                totalPrice,
                receiver: {
                    studentId,
                    studentName,
                },
                timeReceive
            })
            const result = await order.save();
            return result;
        } catch (err) {
            throw err;
        }
    },
    getOrderById: async (orderId) => {
        try {
            const order = await Order.findOne({ _id: orderId });
            return order;
        } catch (err) {
            throw err;
        }
    },
    updateOrderState: async (orderId, state) => {
        try {
            const order = await Order.findOneAndUpdate({ _id: orderId }, {
                $set: {
                    state: state
                }
            }, { new: true })
            return order;
        } catch (err) {
            throw err;
        }
    },
    deleteOrder: async (orderId) => {
        try {
            const order = await Order.findOneAndDelete({ _id: orderId });
            return order;
        } catch (err) {
            throw err;
        }
    },
    getOrderBetweenAInterval: async (startDate, endDate) => {
        try {
            const orders = await Order.find({
                createAt: {
                    $gte: startDate,
                    $lt: endDate
                }
            }).populate({
                path: 'goods._id',
                populate: {
                    path: 'goodsType'
                }
            });
            return orders;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = orderRepository;