const {User} = require('./../Model');

const userRepository = {
    // some method here
    createUser: async({username, password, role, kind, userType})=> {
        try {
            //generate user
            const user = new User({
                username: username,
                password: password,
                roleIds: role,
                kind: kind,
                userType: userType
            });

            //save user in database 
            const result = await user.save();
            return result;
        } catch(err) {
            throw err;
        }
    },
    findUserByUsername: async(username)=>{
        try {
            const result = await User.findOne({username: username}).populate('userType');
            return result;
        }
        catch(err) {
            throw err;
        }
    },
    findUserById: async(_id)=> {
        try {
            const result = await User.findOne({_id: _id});
            return result;
        }
        catch(err) {
            throw err;
        }
    },
    updatePasswordByUserId: async(_id, value)=>{
        try {
            await User.updateOne({_id: _id}, {$set: {password: value}});
        } catch(err) {
            throw err;
        }
    },
}

module.exports = userRepository;