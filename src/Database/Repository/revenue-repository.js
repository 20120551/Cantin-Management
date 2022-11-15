const {Revenue} = require('./../Model');

const revenueRepository = {
    createRevenue: async(payload) => {
        try {
            const revenue = new Revenue(payload)
            const result = await revenue.save();
            return result;
        } catch(err) {
            throw err;
        } 
    },
    getRevenueById: async(revenueId)=> {
        try {
            const revenue = await Revenue.findById({_id: revenueId});
            return revenue;
        } catch(err) {
            throw err;
        }
    },
    getRevenueBetweenAInterval: async(startDate, endDate) => {
        try {
            const revenues = await Revenue.find({
                createAt: {
                    $gte: startDate,
                    $lt: endDate
                }
            })
            return revenues;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = revenueRepository;