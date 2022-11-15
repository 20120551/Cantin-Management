const schedule = require('node-schedule');
const {schedule: schedule_constant} = require('./../Constant');
const {cartService, revenueService, goodsService} = require('./../Service');
const {convertDateToCron} = require('./../Utils');

class Schedule {
    constructor(event) {
        this.event = event;
    }
    start = () => {
        try {
            const revenueCron = convertDateToCron(schedule_constant.REVENUE);
            this.createRevenueAutomatically(revenueCron);
        } catch(err) {
            this.event.emit('schedule_err', {
                cause: err.cause,
                message: err.message
            })
        }
    }
    expireCart = (date, cartId) => {
        try {
            schedule.scheduleJob(date, async()=>{
                try {
                    console.log('cart that was store on cookie has been expired');
                    await cartService.removeCart(cartId);
                } catch(err) {
                    this.event.emit('schedule_err', {
                        cause: 'expireCart',
                        message: err.message
                    })
                }
            })
        } catch(err) {
            this.event.emit('schedule_err', {
                cause: 'expireCart',
                message: err.message
            })
        }
    }
    createRevenueAutomatically = (date) => {
        try {
            schedule.scheduleJob(date, async()=>{
                try {
                    console.log('create new revenue automatically after a day');
                    // tạo phiếu thống kê doanh thu
                    await revenueService.createRevenue();
                    // xóa số lượng đang bán của món chính
                    await goodsService.resetProductOfMainDish();
                } catch(err) {
                    this.event.emit('schedule_err', {
                        cause: 'createRevenueAutomatically',
                        message: err.message
                    })
                }
            })
        } catch(err) {
            this.event.emit('schedule_err', {
                cause: 'createRevenueAutomatically',
                message: err.message
            })
        }
    }
}

module.exports = Schedule;