const {Staff} = require('./../Model');

const staffRepository = {
    createDefaultStaff: async()=>{
        try {
            const student = new Staff({
                fullName: '',
                birthDay: new Date(),
                sex: 'Nam',
            });

            const result = await student.save();
            return result;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = staffRepository;