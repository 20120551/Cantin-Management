const {status, restrict} = require('./../Constant');
const {revenueRepository, orderRepository} = require('./../Database');
const {convertParticularTimeStringToDate, FormatData} = require('./../Utils');

const revenueService = {
    createRevenue: async()=>{
        try {
            const [startCloseStore, endCloseStore] = restrict.CLOSE_STORE.split('-');

            // chuyển dạng giờ việt nam sang giờ quốc tế
            // Thời gian bán sản phẩm là 7h30 - 19h30
            const startcloseStoreTime = convertParticularTimeStringToDate(endCloseStore);
            const endcloseStoreTime = convertParticularTimeStringToDate(startCloseStore);
            
            let orders = await orderRepository.getOrderBetweenAInterval(startcloseStoreTime, endcloseStoreTime);
            if(!orders) {
                throw new Error('We has no order on this day, maybe it is a day-off',{
                    cause: status.BAD_REQUEST
                })
            }
            // xử lý thông tin của order
            const goods = [];
            for(const order of orders) {
                for(const _goods of order.goods) {
                    const {_id: goodsInfo, quantity} = _goods;
                    const { 
                        _id,
                        price: currentPrice,
                        goodsType
                    } = await goodsInfo.populate('goodsType');
    
                    // kiểm trang hàng hóa đã tồn tại chưa
                    const index = goods.findIndex((goods)=>goods._id === _id);

                    // nếu hàng hóa đó chưa tồn tại, push vào
                    if(index === -1) {
                        goods.push({
                            _id,
                            currentPrice,
                            quantity,
                            rateProfit: goodsType.profitRate || 1
                        })
                    } else {
                        goods[index].quantity += quantity;
                    }
                }
            }
            const totalMoney = orders.reduce((prev, curr)=>{
                return prev + curr.totalPrice;
            }, 0)
            const payload = {
                goods,
                totalMoney,
                createAt: new Date()
            }
            const revenue = await revenueRepository.createRevenue(payload);
            return FormatData({revenue});
        } catch(err) {
            throw err;
        }
    },
    getRevenue: async(revenueId) => {
        try {
            let revenue = await revenueRepository.getRevenueById(revenueId);
            if(!revenue) {
                throw new Error('revenue does not exist',{
                    cause: status.BAD_REQUEST
                })
            }
            revenue = await revenue.populate('goods._id');
            return FormatData({revenue});
        } catch(err) {
            throw err;
        }
    },
    getRevenueBetweenAInterval: async(startDate, endDate) => {
        try {
            const revenues = await revenueRepository.getRevenueBetweenAInterval(startDate, endDate);
            if(!revenues) {
                throw new Error('revenue does not exist',{
                    cause: status.BAD_REQUEST
                })
            }
            return FormatData({revenues});
        } catch(err) {
            throw err;
        }
    }
}

module.exports = revenueService;