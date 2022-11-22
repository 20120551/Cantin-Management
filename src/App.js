import { Routes, Route } from 'react-router-dom';
import { ProtectRoute } from './components/authorization';
import { role } from './config';
import Login from './pages/login';
import { HomeLayout, CartRoute, PaymentRoute, OrderRoute } from './routes';

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomeLayout />}>
                    <Route index element={<Home />} />
                    <Route path='/cart/*' element={<CartRoute />} />
                    <Route path='/payment/*' element={<PaymentRoute />} />
                    <Route element={<ProtectRoute />}>
                        <Route path='/order/*' element={<OrderRoute />} />
                    </Route>
                    <Route element={<ProtectRoute allowRoles={[role.OWNER]} />}>
                        <Route path='/create' element={<Create />} />
                    </Route>
                    <Route path='/unauthorized' element={<Unauthorization />} />
                </Route>
                <Route path='/login' element={<Login />} />
            </Routes>
        </>
    )
}

function Create() {
    return <h1>Create page</h1>
}
function Unauthorization() {
    return <h1>Unauthorization page</h1>
}
function Home() {
    return (
        <>
            <h1>Home page</h1>
        </>
    )
}

export default App;
