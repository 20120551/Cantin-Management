const {status} = require('./../Constant');
const {revenueService} = require('./../Service');

class RevenueController {
    getRevenue = async(req, res, next) => {
        try {
            const {id} = req.params;
            const {revenue} = await revenueService.getRevenue(id);
            res.status(status.OK).json({
                message: 'get revenue successfully',
                data: revenue
            })
        } catch(err) {
            next(err);
        }
    }
    getRevenueBetweenAInterval = async(req, res, next) => {
        try {
            const {startDate, endDate} = req.body;
            const {revenues} = await revenueService.getRevenueBetweenAInterval(new Date(startDate), new Date(endDate));
            res.status(status.OK).json({
                message: 'get revenues between a interval successfully',
                data: revenues
            })
        } catch(err) {
            next(err);
        }
    }
    createRevenue = async(req, res, next) => {
        try {
            const {revenue} = await revenueService.createRevenue();
            res.status(status.OK).json({
                message: 'create revenue sucessfully',
                data: revenue
            })
        } catch(err) {
            next(err);
        }
    }
}

module.exports = RevenueController;