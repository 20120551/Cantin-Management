import { Routes, Route } from "react-router-dom";
import { Payment, PaySuccess } from './../pages';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

function PaymentRoute() {
    const order = Cookies.get('order');
    const location = useLocation();
    return (
        <Routes>
            <Route index element={order ? <Payment /> : <Navigate to='/cart' state={{ from: location }} replace />} />
            <Route path='success' element={<PaySuccess />} />
        </Routes>
    )
}

export default PaymentRoute;