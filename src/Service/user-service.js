// import user-repository here
const {status} = require('./../Constant');
const {userRepository, staffRepository, roleRepository} = require('./../Database');
const {
    GenerateSalt, 
    GeneratePassword,
    ValidatePassword,
    GenerateToken,
    VerifyToken,
    FormatData,
    sendOtpThroughMail,
    verifyMailOtp
} = require('./../Utils');
const { MAIL_TOKEN } = require('./../Config');

const userService = {
    // [POST] /api/v1/user/register
    signUp: async(username, password, role = 'staff') => {
        try {
            //Kiểm tra user đã tồn tại hay chưa
            const isExistsUser = await userRepository.findUserByUsername(username);
            if(isExistsUser) {
                throw new Error('user has existed', {
                    cause: status.NOT_FOUND
                });
            }

            //mã hóa mật mã
            const salt = await GenerateSalt();
            const _password=  await GeneratePassword(password, salt);

            //lấy role Id dựa trên rolename
            let _role = await roleRepository.findRoleByName(role);

            if(!_role) {
                throw new Error(`${role} role does not support`, {
                    cause: status.BAD_REQUEST
                });
            }
            //tạo mặt định 1 nhân viên
            const {_id} =  await staffRepository.createDefaultStaff();

            const user = await userRepository.createUser({
                username, 
                password: _password, 
                role: _role._id,
                kind: role,
                userType: _id
            });

            return FormatData({user});
        } catch(err) {
            throw err;
        }
    },
    // [PUT] /api/v1/user/change-password
    sendOtpForChangingPassword: async(id, username, confirmPassword, newPassword) => {
        try {
            const user = await userRepository.findUserById(id);
            if (!user) {
                throw new Error('user does not exist', {
                    cause: status.NOT_FOUND
                })
            } 
            //verify password
            const isMatch = await ValidatePassword(confirmPassword, user.password);
            if(!isMatch) {
                throw new Error('your old password input was wrong', {
                    cause: status.BAD_REQUEST 
                });
            }
            const emailPayload = {
                email: username,
                currentPassword: confirmPassword,
                newPassword
            };
            const secretKey = await sendOtpThroughMail(emailPayload, 'CHANGE_PASS_WORD');

            const salt = await GenerateSalt();
            const _password = await GeneratePassword(newPassword, salt);

            const secretKeyToken = GenerateToken({secretKey, newPassword: _password}, MAIL_TOKEN, '30m');
            return FormatData({secretKeyToken});
        } catch(err) {
            throw err;
        }
    },
    // [POST] /api/v1/user/change-password
    vertifyOtpForChangingPassword: async(id, token, key) => {
        try {
            const {newPassword, secretKey} = VerifyToken(token, MAIL_TOKEN);
            //check input key matched with secretKey
            await verifyMailOtp(key, secretKey);

            //change password
            await userRepository.updatePasswordByUserId(id, newPassword);
        } catch(err) {
            throw err;
        }
    },
    // [POST] /api/v1/user/change-profile
    updateProfile: async(id, updateData) => {
        try {
            const user = await userRepository.updateProfileByUserId(id, updateData);
            return FormatData({user});
        } catch(err) {
            throw err;
        }
    },
    // [PUT] /api/v1/user/logout
    logout: async(_id) => {
        try {
            //cập nhật trạng thái của user
            await userRepository.updateStateById(_id, false);
        } catch(err){
            throw err;
        }
    },
}

module.exports = userService;