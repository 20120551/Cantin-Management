const {status} = require('./../Constant');
const {bStatisticService} = require('./../Service');

class BStatisticController {
    getBStatistic = async(req, res, next) => {
        try {
            const {id} = req.params;
            console.log(id);
            const {businessStatistic} = await bStatisticService.getBStatisticById(id);
            res.status(status.OK).json({
                message: 'get business statistic sucessfully',
                data: businessStatistic
            })
        } catch(err) {
            next(err);
        }
    }
    getBStatisticBetweenAInterval = async(req, res, next) => {
        try {
            const {
                startDate,
                endDate
            } = req.body;
            const {businessStatistic} = await bStatisticService.getBStatisticBetweenAInterval(
                new Date(startDate), new Date(endDate)
            );
            res.status(status.OK).json({
                message: 'get business statistic sucessfully',
                data: businessStatistic
            })
        } catch(err) {
            next(err);
        }
    }
    createBStatistic = async(req, res, next) => {
        try {
            const {businessStatistic} = await bStatisticService.createBusinessStatisticAutomatically();
            res.status(status.OK).json({
                message: 'create business statistic successfully',
                data: businessStatistic
            })
        } catch(err) {
            next(err);
        }
    }
}

module.exports = BStatisticController;