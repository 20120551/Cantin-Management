const schedule = require('node-schedule');
const {cartRepository} = require('./../Database');

class Schedule {
    expireCart = (date, cartId) => {
        try {
            schedule.scheduleJob(date, async()=>{
                try {
                    console.log('cart that was store on cookie has been expired');
                    await cartRepository.removeCart(cartId);
                } catch(err) {
                    throw err;
                }
            })
        } catch(err) {
            throw err;
        }
    }
}

module.exports = Schedule;