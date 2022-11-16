const {MainDish} = require('./../Model');

const mainDishRepository = {
    createDefault: async()=>{
        try {
            const newMD = new MainDish({
                profitRate: '5000',
            });

            const result = await newMD.save();
            return result;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = mainDishRepository;