const {SideDish} = require('./../Model');

const sideDishRepository = {
    createDefault: async(info)=>{
        try {
            const newSD = new SideDish({
                capacity: info.capacity,
            });

            const result = await newSD.save();
            return result;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = sideDishRepository;