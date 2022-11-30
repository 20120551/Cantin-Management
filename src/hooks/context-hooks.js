import { AuthContext, UserContext, CartContext,
        GoodsContext, ScheduleContext, ReceiveContext } from './../store/context';
import { useContext } from 'react';

export const useAuth = function () {
    const [state, dispatch] = useContext(AuthContext);
    return [state, dispatch];
}

export const useUser = function () {
    const [state, dispatch] = useContext(UserContext);
    return [state, dispatch];
}

export const useCart = function () {
    const [state, dispatch] = useContext(CartContext);
    return [state, dispatch];
}

export const useGoods = function () {
    const [state, dispatch] = useContext(GoodsContext);
    return [state, dispatch];
}

export const useSchedule = function () {
    const [state, dispatch] = useContext(ScheduleContext);
    return [state, dispatch];
}

export const useReceive = function () {
    const [state, dispatch] = useContext(ReceiveContext);
    return [state, dispatch];
}
