const {Role} = require('./../Model');

const roleRepository = {
    findRoleByName: async(roleName)=>{
        try {
            const role = await Role.findOne({name: roleName}).populate('permissions');
            return role;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = roleRepository;