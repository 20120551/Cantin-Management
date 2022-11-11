// import user-service here
const {status} = require('./../Constant');
const {authService} = require('./../Service');

class AuthController {
    // [POST] /api/v1/auth/login
    login = async(req, res, next) => {
        try{
            //get database from client input
            const {username, password} = req.body;
            //get accessToken and refreshToken
            const {payload, accessToken} = await authService.login(username, password);

            res.status(status.OK).json({
                message: 'login sucessfully',
                data: {
                    user: {...payload}, 
                    accessToken
                }
            })
        } catch(err){
            next(err);
        }
    }
    // [PUT] /api/v1/auth/forgot-password
    sendOtpForForgetingPassword = async(req, res, next) => {
        try {
            const {username} = req.body;
            const {secretKeyToken} = await authService.sendOtpForForgetingPassword(username);

            //set secret key in cookie
            res.cookie('secretKey', secretKeyToken, {
                secure: false,
                httpOnly: true,
                sameSite: "strict",
            });

            res.status(status.OK).json({
                message: `key to active ${secretKeyToken}`,
                data: null
            });
        } catch(err) {
            next(err);
        }
    }
    // [PUT] /api/v1/auth/verify-key
    vertifyOtpForForgetingPassword = async(req, res, next) => {
        try {
            const { key } = req.body;
            const secretKey = req.cookies.secretKey;

            const {userIdToken} = await authService.vertifyOtpForForgetingPassword(key, secretKey);

            //clear cookie
            res.clearCookie("secretKey");

            //set user id in cookie
            res.cookie('user_id', userIdToken, {
                secure: false,
                httpOnly: true,
                sameSite: "strict",
            })
            
            res.status(status.OK).json({
                message: 'verify otp key successfully',
                data: null,
            });
        } catch(err) {
            next(err);
        }
    }
    // [POST] /api/v1/auth/forgot-password
    forgotPassword = async(req, res, next) => {
        try {
            const {password} = req.body;
            const userId = req.cookies.user_id;

            //call service
            await authService.forgotPassword(userId, password);

            //clear cookie
            res.clearCookie("user_id");

            res.status(status.OK).json({
                message: 'change password successfully',
                data: null,
            });
        } catch(err) {
            next(err);
        }
    }
}

module.exports = AuthController;