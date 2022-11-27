const {timeKeepingRepository} = require('./../Database');
const {status} = require('./../Constant');
const {FormatData} = require('./../Utils');

const timeKeepingService = {
    getStaffTK: async(userId) => {
        try {
            const timeKeeping = await timeKeepingRepository.getStaffTK(userId);
            if(!timeKeeping) {
                throw new Error('schedule does not found', {
                    cause: status.BAD_REQUEST
                })
            }

            return FormatData({timeKeeping: timeKeeping});
        } catch(err) {
            throw err;
        }
    },
    check: async (info) => {
        try {
            console.log(3)
            // thêm hàng
            const timeKeeping = await timeKeepingRepository.check(info);

            return FormatData({timeKeeping: timeKeeping });
        } catch (err) {
            throw err;
        }
    },
}

module.exports = timeKeepingService;