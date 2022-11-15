const {
    bStatisticRepository, 
    revenueRepository, 
    receiveNoteRepository
} = require('./../Database');
const {status, profit} = require('./../Constant');
const {convertParticularTimeStringToDate, FormatData} = require('./../Utils');

const bStatisticService = {
    getBStatisticById: async(id) => {
        try {
            const bStatistic = await bStatisticRepository.getBStatisticById(id);
            if(!bStatistic) {
                throw new Error('business statistic does not found', {
                    cause: status.BAD_REQUEST
                })
            }

            return FormatData({businessStatistic: bStatistic});
        } catch(err) {
            throw err;
        }
    },
    getBStatisticBetweenAInterval: async(startDate, endDate) => {
        try {
            const bStatistic = await bStatisticRepository.getBStatisticBetweenAInterval(startDate, endDate);
            if(!bStatistic) {
                throw new Error('business statistic does not found', {
                    cause: status.BAD_REQUEST
                })
            }

            return FormatData({businessStatistic: bStatistic});
        } catch(err) {
            throw err;
        }
    },
    createBusinessStatisticAutomatically: async() => {
        try {
            // lấy ngày đầu tiên của tháng
            const startDate = convertParticularTimeStringToDate('1d 7h 30m 0s');
            // lấy thời gian hiện tại = thời gian lên lịch = thời gian cuối tháng
            const endDate = new Date();

            // revenues,
            const revenues = await revenueRepository.getRevenueBetweenAInterval(startDate, endDate);
            if(!revenues) {
                throw new Error('revenues on this month was not found, please check your service again', {
                    cause: status.BAD_REQUEST
                })
            }

            // receiveNotes,
            let receiveNotes = await receiveNoteRepository.getReceiveNotesBetweenAInterval(startDate, endDate);
            if(!receiveNotes) {
                // ngầm hiểu tháng này không có nhập hàng mới
                receiveNotes = [];
            };

            // tính toán thông tin doanh số
            // totalSoldMoney: tổng số tiền đã bán được trong tháng này
            const totalSoldMoney = revenues.reduce((prev, curr)=>prev+curr.totalMoney, 0);

            // totalSpentMoney: tổng số tiền đã chi ra cho tháng, 
            //mặc định món chính hằng ngày là 5.000.000
            //tiền của món phụ sẽ từ phiếu nhập kho
            const totalSpentMoney= receiveNotes.reduce((prev, curr)=>{
                const totalPrice = curr.totalPrice || 0;
                return prev + totalPrice;
            }, 0) + profit.MAIN_DISH_PRICE * revenues.length;
            // profit: lợi nhuận.
            // lợi nhuận = doanh thu - nhập kho 
            const _profit = totalSoldMoney - totalSpentMoney;

            // tạo phiếu doanh thu
            const payload = {
                revenues,
                receiveNotes,
                totalSoldMoney,
                totalSpentMoney,
                profit: _profit
            }
            
            const businessStatistic = await bStatisticRepository.createBusinessStatisticAutomatically(payload);
            return FormatData({businessStatistic});
        } catch(err) {
            throw err;
        }
    } 
}

module.exports = bStatisticService;