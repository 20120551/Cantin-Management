const {
    Assignment,
    Shift,
    TimeKeeping,
} = require('./../Model');

const {
    getFirstDate, 
    getLastDate
} = require('./../../Utils');

const scheduleRepository = {
    // Tạo assignment mới
    assignment: async ({assignmentDate, shiftId, userId}) => {
        try {
            let result;
            console.log(shiftId);
            result = await Assignment.findOneAndUpdate(
                { assignmentDate: assignmentDate, shiftId: shiftId }, 
                { $set: { userID: userId }}, 
                { new: true}
                );
            console.log(result);
            if (result === null)
            {
                //generate assignment
                const assignment = new Assignment({
                    assignmentDate: assignmentDate,
                    shiftId: shiftId,
                    userId: userId
                });
                //save assignment in database 
                result = await assignment.save();
            }
            else{}
            if (await TimeKeeping.findOneAndUpdate({userId: userId},{$push: {workDays: {_id: result._id,check: false}}}) === null)
            {
                const timeKeeping = new TimeKeeping({
                    userId: userId,
                    workDays: {
                        _id: result._id,
                        check: false
                    }
                });
                await timeKeeping.save();
            }
            else{}

            await result.populate({
                path: 'shiftId',
            });
            await result.populate({
                path: 'userId',
            });
            return result;
        } catch (err) {
            throw err;
        }
    },
    getAll: async() => {
        try {
            const schedule = await Assignment.find({})
                .populate({
                path: 'userId',
                populate: {
                    path: 'userType',
                }
            }).populate({path: 'shiftId'});
            return schedule;
        } catch(err) {
            throw err;
        }
    },
    getMonth: async(month, year) => {
        try {
            const firstDate = await getFirstDate(year, month);
            const lastDate = await getLastDate(year, month);
            console.log(firstDate,lastDate);
            const schedule = await Assignment.find({assignmentDate: {
                $gte: firstDate,
                $lt: lastDate
                }
            })
                .populate({
                    path: 'userId',
                    populate: {
                        path: 'userType',
                    }
                }).populate({path: 'shiftId'}).exec();
            return schedule;
        } catch(err) {
            throw err;
        }
    },
    getDate: async(date) => {
        try {
            const schedule = await Assignment.find({assignmentDate: date})
                .populate({
                    path: 'userId',
                    populate: {
                        path: 'userType',
                    }
                }).populate({path: 'shiftId'}).exec();
            return schedule;
        } catch(err) {
            throw err;
        }
    },
}

module.exports = scheduleRepository;