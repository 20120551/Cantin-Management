module.exports = {
    Assignment: require('./assigmentModel/assignment-model'),
    Shift: require('./assigmentModel/shift-model'),
    TimeKeeping: require('./assigmentModel/timeKeeping-model'),
    DeliveryNote: require('./goodsModel/deliveryNote-model'),
    Goods: require('./goodsModel/goods-model'),
    MainDish: require('./goodsModel/mainDish-model'),
    ReceiveNote: require('./goodsModel/receiveNote-model'),
    SideDish: require('./goodsModel/sideDish-model'),
    Cart: require('./shoppingModel/cart-model'),
    Order: require('./shoppingModel/order-model'),
    Revenue: require('./statisticModel/revenue-model'),
    BusinessStatistic: require('./statisticModel/businessStatistic'),
    Owner: require('./userModel/owner-model'),
    Permission: require('./userModel/permission-model'),
    Role: require('./userModel/role-model'),
    Staff: require('./userModel/staff-model'),
    User: require('./userModel/user-model'),
}