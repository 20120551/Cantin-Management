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
        }catch(error) {
            const status = error.status || status.INTERNAL_ERROR;
            const message = error.message;
            res.status(status).json(message);
        }
    }
    // [PUT] /api/v1/user/change-password
    sendOtpForChangingPassword = async(req, res, next) => {

    }
    // [POST] /api/v1/user/change-password
    vertifyOtpForChangingPassword = async(req, res, next) => {

    }
    // [POST] /api/v1/user/change-profile
    changeProfile = async(req, res, next) => {

    }
    // [PUT] /api/v1/user/logout
    logout = async(req, res, next) => {

    }
}

module.exports = UserController;