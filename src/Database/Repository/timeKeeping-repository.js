const {TimeKeeping} = require('./../Model');

const timeKeepingRepository = {
    // Tạo assignment mới
    getStaffTK: async (userId) => {
        try {
            const timeKeeping = await TimeKeeping.find({userId: userId})
                .populate({
                    path: 'userId',
                    populate: {
                        path: 'userType',
                    }
                }).populate({
                    path: 'workDays._id',
                    populate: {
                        path: 'shiftId userId',
                    }
                })
                .exec();
            return timeKeeping;
        } catch (err) {
            throw err;
        }
    },
    check: async(info) => {
        try {
            console.log(4);
            console.log(info);
            const timeKeeping = await TimeKeeping.findOneAndUpdate({userId: info.userId}, {
                $set: {
                    'workDays.$[elem].check': true
                }
            }, {
                arrayFilters: [{
                    'elem._id': info.assignmentId
                }],
                new: true
            });
            console.log(timeKeeping);
            return timeKeeping;
        } catch(err) {
            throw err;
        }
    },
}

module.exports = timeKeepingRepository;