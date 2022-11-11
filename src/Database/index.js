module.exports = {
    userRepository: require('./Repository/user-repository'),
    staffRepository: require('./Repository/staff-repository'),
    roleRepository: require('./Repository/role-repository'),
    connectToMongoDb: require('./dbConnection'),
}