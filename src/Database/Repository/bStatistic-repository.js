const {BusinessStatistic} = require('./../Model');

const bStatisticRepository = {
    getBStatisticById: async(id) => {
        try {
            const bStatistic = await BusinessStatistic.findById({_id: id})
                .populate('revenues')
                .populate('receiveNotes');
            return bStatistic;
        } catch(err) {
            throw err;
        }
    },
    getBStatisticBetweenAInterval: async(startDate, endDate) => {
        try {
            const bStatistic = await BusinessStatistic.find({
                createAt: {
                    $gte: startDate,
                    $lt: endDate
                }
            })
            .populate('revenues')
            .populate('receiveNotes');
        return bStatistic;
        } catch(err) {
            throw err;
        }
    },
    createBusinessStatisticAutomatically: async(payload) => {
        try {
            const businessStatistic = new BusinessStatistic(payload);
            const result = await businessStatistic.save();
            return result;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = bStatisticRepository;