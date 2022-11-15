module.exports = {
    userRepository: require('./Repository/user-repository'),
    staffRepository: require('./Repository/staff-repository'),
    roleRepository: require('./Repository/role-repository'),
    cartRepository: require('./Repository/cart-repository'),
    orderRepository: require('./Repository/order-repository'),
    goodsRepository: require('./Repository/goods-repository'),
    revenueRepository: require('./Repository/revenue-repository'),
    connectToMongoDb: require('./dbConnection'),
}