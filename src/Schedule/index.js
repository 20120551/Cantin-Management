const schedule = require('node-schedule');
const { schedule: schedule_constant } = require('./../Constant');
const {
    cartService,
    revenueService,
    goodsService,
    bStatisticService
} = require('./../Service');
const { convertDateToCron } = require('./../Utils');

class Schedule {
    constructor(event) {
        this.event = event;
    }
    start = () => {
        try {
            // tạo phiếu doanh thu sau 1 ngày
            const revenueCron = convertDateToCron(schedule_constant.REVENUE);
            this.createRevenueAutomatically(revenueCron);
            // tạo phiếu doanh số sau 1 tháng
            const businessStatisticCron = convertDateToCron(schedule_constant.BUSINESS_STATISTIC);
            this.createBusinessStatisticAutomatically(businessStatisticCron);
        } catch (err) {
            this.event.emit('schedule_err', {
                cause: err.cause,
                message: err.message
            })
        }
    }
    expireCart = (date, cartId) => {
        try {
            schedule.scheduleJob(date, async () => {
                try {
                    console.log('cart that was store on cookie has been expired');
                    await cartService.removeCart(cartId);
                } catch (err) {
                    this.event.emit('schedule_err', {
                        cause: 'expireCart',
                        message: err.message
                    })
                }
            })
        } catch (err) {
            this.event.emit('schedule_err', {
                cause: 'expireCart',
                message: err.message
            })
        }
    }
    createRevenueAutomatically = (date) => {
        try {
            schedule.scheduleJob(date, async () => {
                try {
                    console.log('create new revenue automatically after a day');
                    // tạo phiếu thống kê doanh thu
                    await revenueService.createRevenue();
                    // xóa số lượng đang bán của món chính
                    await goodsService.resetProductOfMainDish();
                } catch (err) {
                    this.event.emit('schedule_err', {
                        cause: 'createRevenueAutomatically',
                        message: err.message
                    })
                }
            })
        } catch (err) {
            this.event.emit('schedule_err', {
                cause: 'createRevenueAutomatically',
                message: err.message
            })
        }
    }
    createBusinessStatisticAutomatically = (date) => {
        try {
            schedule.scheduleJob(date, async () => {
                try {
                    console.log('create new business statistic automatically after a month');
                    // tạo phiếu thống kê doanh số
                    await bStatisticService.createBusinessStatisticAutomatically();
                } catch (err) {
                    this.event.emit('schedule_err', {
                        cause: 'createBusinessStatisticAutomatically',
                        message: err.message
                    })
                }
            })
        } catch (err) {
            this.event.emit('schedule_err', {
                cause: 'createBusinessStatisticAutomatically',
                message: err.message
            })
        }
    }
}

module.exports = Schedule;