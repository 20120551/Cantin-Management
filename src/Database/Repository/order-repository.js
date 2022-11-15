// import some model here
const {Order} = require('./../Model');

const orderRepository = {
    createWaitingOrder: async(studentInfo, timeReceive, goods) => {
        const {
            studentName,
            studentId
        } = studentInfo;
        try {
            const totalPrice = goods.reduce((prev, curr)=>{
                return prev + curr.price * curr.quantity;
            }, 0);
            const order = new Order({
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
        } catch(err) {
            throw err;
        }
    },
    getOrderById: async(orderId) => {
        try {
            const order = await Order.findById({_id: orderId});
            return order;
        } catch(err) {
            throw err;
        }
    },
    updateOrderState: async(orderId, state) => {
        try {
            const order = await Order.findOneAndUpdate({_id: orderId}, {
                $set: {
                    state: state
                }
            }, {new: true})
            return order;
        } catch(err) {
            throw err;
        }
    },
    deleteOrder: async(orderId) => {
        try {
            const order = await Order.findOneAndDelete({_id: orderId});
            return order;
        } catch(err) {
            throw err;
        }
    },
    getOrderBetweenAInterval: async(startDate, endDate) => {
        try {
            const orders = await Order.find({
                createAt: {
                    $gte: new Date('2022-11-14T08:14:38.610+00:00'),
                    $lt: new Date('2022-11-14T12:10:54.476+00:00')
                }
            }).populate({
                path: 'goods._id',
                populate: {
                    path: 'goodsType'
                }
            });
            return orders;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = orderRepository;