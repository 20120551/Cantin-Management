import { cart } from './../../constant';

const cartInitialState = [];

const cartReducer = (state, action) => {
    let newState = [];
    let goodsInfo = null;
    let quantity = 0;
    switch (action.type) {
        case cart.GET_CART:
        case cart.ADD_GOODS_TO_CART:
            const {
                goods
            } = action.payload.data;

            newState = goods.map((goods) => {
                const {
                    _id: goodsInfo,
                    quantity
                } = goods;
                return {
                    quantity,
                    goods: goodsInfo
                }
            })
            return [...newState]
        case cart.UPDATE_GOODS_ON_CART:
            // lấy thông tin cart
            goodsInfo = action.payload.data._id;
            quantity = action.payload.data.quatity;
            // xử lý logic
            const index = state.findIndex((goods) => goods._id === goodsInfo._id);
            state[index].quantity = quantity;
            return [...state]
        case cart.REMOVE_GOODS_FROM_CART:
            // lấy thông tin cart
            goodsInfo = action.payload.data._id;
            // xử lý logic
            newState = state.filter((goods) => goods._id !== goodsInfo._id);
            return [...newState]
        default:
            return [...state]
    }
}

export { cartInitialState };
export default cartReducer;