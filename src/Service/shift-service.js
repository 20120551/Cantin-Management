const {shiftRepository} = require('./../Database');
const {status} = require('./../Constant');
const {FormatData} = require('./../Utils');

const shiftService = {
    getAll: async() => {
        try {
            const shifts = await shiftRepository.getAll();
            if(!shifts) {
                throw new Error('schedule does not found', {
                    cause: status.BAD_REQUEST
                })
            }

            return FormatData({shifts: shifts});
        } catch(err) {
            throw err;
        }
    },
    add: async (shiftInfo) => {
        try {

            // thêm hàng
            const shift = await shiftRepository.add({
                start: shiftInfo.start,
                end: shiftInfo.end,
                name: shiftInfo.name
            });

            return FormatData({new_shift: shift });
        } catch (err) {
            throw err;
        }
    },
}

module.exports = shiftService;