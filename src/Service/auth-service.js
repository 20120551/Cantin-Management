// import user-repository here
const {status, expire} = require('./../Constant');
const {userRepository} = require('./../Database');
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

const {
    MAIL_TOKEN,
    USER_TOKEN,
    ACCESS_TOKEN
} = require('./../Config');

const authService = {
    // [POST] /api/v1/auth/login
    login: async(username, password) => {
        try {
            //check username has existed
            const user = await userRepository.findUserByUsername(username);

            //check username
            if(!user) {
                throw new Error('user does not exist', {
                    cause: status.NOT_FOUND
                });
            }

            const validPassword = await ValidatePassword(password, user.password);
            //check password
            if(!validPassword) {
                throw new Error('incorrect password', {
                    cause: status.BAD_REQUEST
                });
            }

            // cập nhật trạng thái đang hoạt động
            await userRepository.updateStateById(user._id, true);
            user.status = true;

            //lấy thông tin user, gắn vào token
            const {password: _password, ...payload} = user._doc;
                    
            //create token
            const token = GenerateToken(payload, ACCESS_TOKEN, expire.ACCESS_TOKEN);
            
            return FormatData({payload, accessToken: token});
        } catch(err) {
            throw err;
        }
    },
    // [PUT] /api/v1/auth/forgot-password
    sendOtpForForgetingPassword: async(username) => {
        try {
            const user = await userRepository.findUserByUsername(username);

            //check username
            if(!user) {
                throw new Error('user does not exist', {
                    cause: status.NOT_FOUND
                });
            }

            const emailPayload = {email: username};
            const secretKey = await sendOtpThroughMail(emailPayload, 'CHANGE_PASS_WORD');

            const {password, _id, ...payload} = user._doc;
            //create token
            const secretKeyToken = GenerateToken({secretKey, _id}, MAIL_TOKEN, expire.MAIL_TOKEN);

            //return
            return FormatData({secretKeyToken});
        } catch(err) {
            throw err;
        }
    },
    // [PUT] /api/v1/auth/verify-key
    vertifyOtpForForgetingPassword: async(key, token) => {
        try {
            const {secretKey, _id} = VerifyToken(token, MAIL_TOKEN);

            const isCorrectKey = await verifyMailOtp(key, secretKey);

            if (!isCorrectKey) {
                throw new Error('Your key was not correct, please check your email again', {
                    cause: status.UN_AUTHENTICATE
                })
            }
            //confirm otp key for _id
            const userIdToken = GenerateToken({_id}, USER_TOKEN, expire.MAIL_TOKEN);
            
            return FormatData({userIdToken});
        } catch(err){
            throw err;
        }
    },
    // [POST] /api/v1/auth/forgot-password
    forgotPassword: async(userId, password) => {
        try {
            const {_id} = VerifyToken(userId, USER_TOKEN);

            const salt = await GenerateSalt();
            const _password=  await GeneratePassword(password, salt);

            await userRepository.updatePasswordByUserId(_id, _password);
        } catch(err){
            throw err;
        }
    },
}

module.exports = authService;