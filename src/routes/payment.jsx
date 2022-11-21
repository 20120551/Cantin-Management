import { Routes, Route } from "react-router-dom";
import { Payment, PaySuccess } from './../pages';

function PaymentRoute() {
    return (
        <Routes>
            <Route index element={<Payment />} />
            <Route path='success' element={<PaySuccess />} />
        </Routes>
    )
}

export default PaymentRoute;