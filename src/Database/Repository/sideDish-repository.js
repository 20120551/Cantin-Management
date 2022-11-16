const {SideDish} = require('./../Model');

const sideDishRepository = {
    createDefault: async()=>{
        try {
            const newSD = new SideDish({
                capacity: '1000',
            });

            const result = await newSD.save();
            return result;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = sideDishRepository;