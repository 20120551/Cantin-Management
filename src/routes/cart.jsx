import { Routes, Route } from 'react-router-dom';
import { Cart, CartApprove } from './../pages';
function CartRoute() {
    return (
        <Routes>
            <Route index element={<Cart />} />
            <Route path='approve' element={<CartApprove />} />
        </Routes>
    )
}

export default CartRoute;