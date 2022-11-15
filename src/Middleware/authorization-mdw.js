const { ValidateSignature } = require('./../Utils');
const { status } = require('./../Constant');
const {userRepository} = require('./../Database');

const authorizationMDW = {
    checkUser: (req, res, next)=>{
        //decode token store in req.user
        try {
            const isAuthentication = ValidateSignature(req);
    
            if(!isAuthentication) {
                return res.status(status.UN_AUTHENTICATE).json({
                    message: 'your token is invalid',
                    data: null
                })
            };
    
            next();
        } catch(err) {
            res.status(status.UN_AUTHORIZED).json({
                message: err.message
            });
        }

    },
    checkPermission: async(req, res, next)=>{
        try {
            const isAuthentication = ValidateSignature(req);
    
            if(!isAuthentication) {
                return res.status(status.UN_AUTHENTICATE).json({
                    message: 'your token is invalid',
                    data: null
                })
            };
    
            const { _id } = req.user;

            const user = await userRepository.findUserById(_id);

            if(!user) {
                return res.status(status.UN_AUTHENTICATE).json({
                    message: 'user does not exist',
                    data: null
                })
            }

            const {role} = await user.populate('role');
            const {permissions} = await role.populate('permissions');

            if(!permissions.some((e)=>{
                let url = e.code;
                if(req.params) {
                    const params = req.params;
                    const keys = Object.keys(params);
                    const values = Object.values(params);
                    
                    keys.forEach((key, index)=>{
                        url = url.replace(`:${key}`, values[index]);
                    })
                }
                if(req.query) {
                    let symbol = '?';
                    const query = req.query;
                    const keys = Object.keys(query);
                    const values = Object.values(query);
                    keys.forEach((key, index)=> {
                        url = url.concat(symbol, key, '=', values[index]);
                        symbol = '&';
                    })
                }
                return req.originalUrl === url;
            })) {
                return res.status(status.UN_AUTHORIZED).json({
                    message: 'you are not permission'
                });
            }
            next();
        } catch(err) {
            res.status(status.UN_AUTHORIZED).json({
                message: err.message
            });
        }
    }
}

module.exports = authorizationMDW;