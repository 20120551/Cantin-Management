// import user-repository here
const {status} = require('./../Config');
const {userRepository, staffRepository} = require('./../Database');

const userService = {
    // [POST] /api/v1/user/register
    signUp: async(username, password, role = 'staff') => {
        try {
            //Kiểm tra user đã tồn tại hay chưa
            const isExistsUser = await userRepository.findUserByUsername(username);
            if(isExistsUser) {
                throw new Error({
                    message: 'user does not exist',
                    status: status.NOT_FOUND
                });
            }

            //mã hóa mật mã
            const salt = await GenerateSalt();
            const _password=  await GeneratePassword(password, salt);

            //lấy role Id dựa trên rolename
            let roleId = await roleRepository.findRoleByName(role);

            if(roleId) {
                throw new Error({
                    message: `${role} role does not support`,
                    status: status.BAD_REQUEST
                });
            }
            //tạo mặt định 1 nhân viên
            const {_id} =  await staffRepository.createDefaultStaff();

            const user = await userRepository.createUser({
                username, 
                password: _password, 
                role: roleId,
                kind: role,
                userType: _id
            });

            return FormatData({user});
        } catch(err) {
            throw err;
        }
    },
    // [PUT] /api/v1/user/change-password
    sendOtpForChangingPassword: async(req, res, next) => {

    },
    // [POST] /api/v1/user/change-password
    vertifyOtpForChangingPassword: async(req, res, next) => {

    },
    // [POST] /api/v1/user/change-profile
    changeProfile: async(req, res, next) => {
        
    },
    // [PUT] /api/v1/user/logout
    logout: async(req, res, next) => {

    },
}

module.exports = userService;