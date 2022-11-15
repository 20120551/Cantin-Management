const {ReceiveNote} = require('./../Model');

const receiveNoteRepository = {
    getReceiveNotesBetweenAInterval: async(startDate, endDate) => {
        try {
            const receiveNotes = await ReceiveNote.find({
                createAt: {
                    $gte: startDate,
                    $lt: endDate 
                }
            })
            return receiveNotes;
        } catch(err) {
            throw err;
        }
    } 
}

module.exports = receiveNoteRepository;