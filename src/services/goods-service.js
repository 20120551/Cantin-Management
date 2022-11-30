import { privateAxios } from './../lib/axios';


export const getAllGoodsOnStoreRoom = async () => {
    try {
        const response = await privateAxios.get('/goods/storeroom');
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const getGoodsByID = async ({ goodsId }) => {
    try {
        const response = await privateAxios.get(`/goods/${goodsId}`);
        return response?.data;
    } catch (err) {
        throw err;
    }
}



