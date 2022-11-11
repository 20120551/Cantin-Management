// import user-service here
const {status} = require('./../Constant');
const {userService} = require('./../Service');

class UserController {
    // [POST] /api/v1/user/register
    signUp = async(req, res, next) => {
        try{
            //lấy thông tin được gửi lên từ form
            const {username, password} = req.body;

            //xử lý business logic
            const {user} = await userService.signUp(username, password);

            //trả json về cho người dùng
            res.status(status.OK).json({
                message: 'sign up successfully',
                data: user,
            });
        }catch(err) {
            next(err);
        }
    }
    // [PUT] /api/v1/user/change-password
    sendOtpForChangingPassword = async(req, res, next) => {
        try {
            const {confirmPassword, newPassword} = req.body;
            const {_id, username} = req.user;
            const {secretKeyToken} = await userService.sendOtpForChangingPassword(
                _id, 
                username, 
                confirmPassword, 
                newPassword
            );

            //set cookie
            res.cookie('secretKey', secretKeyToken, {
                secure: false,
                httpOnly: true,
                sameSite: "strict",
            });

            res.status(status.OK).json({
                message: "Let's verify the key that sent to your email",
                data: secretKeyToken
            });
        } catch(err) {
            next(err);
        }
    }
    // [POST] /api/v1/user/change-password
    vertifyOtpForChangingPassword = async(req, res, next) => {
        try {
            const {key} = req.body;
            const token = req.cookies.secretKey;
            const {_id} = req.user;

            await userService.vertifyOtpForChangingPassword(_id, token, key);
            res.status(status.OK).json({
                message: 'Change password successfully',
                data: null,
            });
        } catch(err) {
            next(err);
        }
    }
    // [POST] /api/v1/user/change-profile
    updateProfile = async(req, res, next) => {
        try {
            const {_id} = req.user;

            const {user} = await userService.updateProfile(_id, req.body);

            res.status(status.OK).json({
                message: 'update profile successfully',
                data: user,
            });
        } catch(err) {
            next(err);
        }
    }
    // [PUT] /api/v1/user/logout
    logout = async(req, res, next) => {
        try {
            const {_id} = req.user;

            await userService.logout(_id);

            res.status(status.OK).json({
                message: 'logout sucessfully',
                data: null
            });
        } catch(err) {
            next(err);
        }
    }
}

module.exports = UserController;