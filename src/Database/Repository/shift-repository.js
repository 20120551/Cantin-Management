const {Shift} = require('./../Model');

const shiftRepository = {
    // Tạo assignment mới
    add: async (payload) => {
        try {
            const shift = await new Shift(payload);
            const result = await shift.save();
            return result;
        } catch (err) {
            throw err;
        }
    },
    getAll: async() => {
        try {
            const shifts = await Shift.find({});
            return shifts;
        } catch(err) {
            throw err;
        }
    },
}

module.exports = shiftRepository;