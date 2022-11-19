const {scheduleRepository, userRepository } = require('./../Database');
const {status} = require('./../Constant');
const {FormatData} = require('./../Utils');

const scheduleService = {
    getAll: async() => {
        try {
            const schedule = await scheduleRepository.getAll();
            if(!schedule) {
                throw new Error('schedule does not found', {
                    cause: status.BAD_REQUEST
                })
            }

            return FormatData({schedule: schedule});
        } catch(err) {
            throw err;
        }
    },
    getMonth: async(month, year) => {
        try {
            const schedule = await scheduleRepository.getMonth(month, year);
            if(!schedule) {
                throw new Error('schedule does not found', {
                    cause: status.BAD_REQUEST
                })
            }

            return FormatData({schedule: schedule});
        } catch(err) {
            throw err;
        }
    },
    getDate: async(date) => {
        try {
            const schedule = await scheduleRepository.getDate(date);
            if(!schedule) {
                throw new Error('schedule does not found', {
                    cause: status.BAD_REQUEST
                })
            }
            return FormatData({schedule: schedule});
        } catch(err) {
            throw err;
        }
    },
    assignment: async (assignmentInfo) => {
        try {

            // thêm assignment
            const assignment = await scheduleRepository.assignment({
                assignmentDate: assignmentInfo.assignmentDate,
                shiftId: assignmentInfo.shiftId,
                userId: assignmentInfo.userId
            });
            return FormatData({new_assignment: assignment });
        } catch (err) {
            throw err;
        }
    },
    // createScheduleDefault: async() => {
    //     try {
    //         // lấy ngày đầu tiên của tháng
    //         const startDate = convertParticularTimeStringToDate('1d 7h 30m 0s');
    //         // lấy thời gian hiện tại = thời gian lên lịch = thời gian cuối tháng
    //         const endDate = new Date();

    //         // revenues,
    //         const revenues = await revenueRepository.getRevenueBetweenAInterval(startDate, endDate);
    //         if(!revenues) {
    //             throw new Error('revenues on this month was not found, please check your service again', {
    //                 cause: status.BAD_REQUEST
    //             })
    //         }

    //         // receiveNotes,
    //         let receiveNotes = await receiveNoteRepository.getReceiveNotesBetweenAInterval(startDate, endDate);
    //         if(!receiveNotes) {
    //             // ngầm hiểu tháng này không có nhập hàng mới
    //             receiveNotes = [];
    //         };

    //         // tính toán thông tin doanh số
    //         // totalSoldMoney: tổng số tiền đã bán được trong tháng này
    //         const totalSoldMoney = revenues.reduce((prev, curr)=>prev+curr.totalMoney, 0);

    //         // totalSpentMoney: tổng số tiền đã chi ra cho tháng, 
    //         //mặc định món chính hằng ngày là 5.000.000
    //         //tiền của món phụ sẽ từ phiếu nhập kho
    //         const totalSpentMoney= receiveNotes.reduce((prev, curr)=>{
    //             const totalPrice = curr.totalPrice || 0;
    //             return prev + totalPrice;
    //         }, 0) + profit.MAIN_DISH_PRICE * revenues.length;
    //         // profit: lợi nhuận.
    //         // lợi nhuận = doanh thu - nhập kho 
    //         const _profit = totalSoldMoney - totalSpentMoney;

    //         // tạo phiếu doanh thu
    //         const payload = {
    //             revenues,
    //             receiveNotes,
    //             totalSoldMoney,
    //             totalSpentMoney,
    //             profit: _profit
    //         }
            
    //         const businessStatistic = await bStatisticRepository.createBusinessStatisticAutomatically(payload);
    //         return FormatData({businessStatistic});
    //     } catch(err) {
    //         throw err;
    //     }
    // } 
}

module.exports = scheduleService;