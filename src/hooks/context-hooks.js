import { AuthContext, UserContext, CartContext } from './../store/context';
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