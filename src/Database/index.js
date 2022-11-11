module.exports = {
    userRepository: require('./Repository/user-repository'),
    staffRepository: require('./Repository/staff-repository'),
    connectToMongoDb: require('./dbConnection'),
}