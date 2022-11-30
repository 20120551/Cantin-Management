import { goods } from './../../constant';

export const getAllGoodsOnStoreRoom = payload => ({
    type: goods.GET_STORE_ROOM,
    payload
})

