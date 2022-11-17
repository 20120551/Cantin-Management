const {MainDish} = require('./../Model');

const mainDishRepository = {
    createDefault: async(info)=>{
        try {
            const newMD = new MainDish({
                profitRate: info.profitRate,
            });

            const result = await newMD.save();
            return result;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = mainDishRepository;