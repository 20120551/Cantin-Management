import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Cart, CartApprove } from './../pages';
import Cookies from 'js-cookie';

function CartRoute() {
    const order = Cookies.get('order');
    const location = useLocation();
    return (
        <Routes>
            <Route
                index
                element={order ? <Navigate to='/payment' state={{ from: location }} replace /> : <Cart />} />
            <Route
                path='approve'
                element={order ? <Navigate to='/payment' state={{ from: location }} replace /> : <CartApprove />} />
        </Routes>
    )
}

export default CartRoute;