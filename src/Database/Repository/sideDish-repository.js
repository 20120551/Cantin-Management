const { SideDish } = require('./../Model');

const sideDishRepository = {
    createDefault: async (info) => {
        try {
            const newSD = new SideDish({
                capacity: info?.capacity || 0,
            });

            const result = await newSD.save();
            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = sideDishRepository;