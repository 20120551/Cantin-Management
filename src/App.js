import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { ProtectRoute, ProtectComponent } from './components/authorization';
import { role } from './config';
import { useAuth } from './hooks';
import { auth } from './store/actions';
import Login from './pages/login';

function App() {
    const navigate = useNavigate();
    const [authState, authDispatch] = useAuth();
    const handleLogout = () => {
        authDispatch(auth.logout());
        navigate('/login');
    }
    return (
        <>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <br></br>
            <ProtectComponent allowRoles={[role.OWNER]}>
                <Link to='/create'>Create</Link>
            </ProtectComponent>
            <ProtectComponent>
                <button onClick={handleLogout}>Logout</button>
            </ProtectComponent>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route element={<ProtectRoute allowRoles={[role.OWNER]} />}>
                    <Route path='/create' element={<Create />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/unauthorized' element={<Unauthorization />} />
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
    return <h1>home page</h1>
}

export default App;
