const {TimeKeeping} = require('./../Model');

const timeKeepingRepository = {
    // Tạo assignment mới
    getStaffTK: async (userId) => {
        try {
            console.log(userId);
            const timeKeeping = await TimeKeeping.find({userId: userId})
                .populate({
                    path: 'userId',
                    populate: {
                        path: 'userType',
                    }
                }).populate({
                    path: 'workDays._id',
                    populate: {
                        path: 'shiftId',
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
            const timeKeeping = await TimeKeeping.findOneAndUpdate({userId: info.userId}, {
                $set: {
                    'workDays.$[elem].check': true
                }
            }, {
                arrayFilters: [{
                    'elem._id': info.assignmentID
                }],
                new: true
            });
            return timeKeeping;
        } catch(err) {
            throw err;
        }
    },
}

module.exports = timeKeepingRepository;