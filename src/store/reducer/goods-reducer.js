import { goods } from '../../constant';

const goodsInitialState = [];

const goodsReducer = (state, action) => {
    let newState = [];
    let goodsId = null;
    let quantity = 0;
    switch (action.type) {
        case goods.GET_STORE_ROOM:
            return action.payload?.data
        default:
            return [...state]
    }
}

export { goodsInitialState };
export default goodsReducer;