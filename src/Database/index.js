module.exports = {
    userRepository: require('./Repository/user-repository'),
    staffRepository: require('./Repository/staff-repository'),
    roleRepository: require('./Repository/role-repository'),
    cartRepository: require('./Repository/cart-repository'),
    orderRepository: require('./Repository/order-repository'),
    goodsRepository: require('./Repository/goods-repository'),
    sideDishRepository: require('./Repository/sideDish-repository'),
    mainDishRepository: require('./Repository/mainDish-repository'),
    revenueRepository: require('./Repository/revenue-repository'),
    bStatisticRepository: require('./Repository/bStatistic-repository'),
    receiveNoteRepository: require('./Repository/receiveNote-repository'),
    connectToMongoDb: require('./dbConnection'),
}