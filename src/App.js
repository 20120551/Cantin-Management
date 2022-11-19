import { Link, Routes, Route } from 'react-router-dom';
import { RequireAuth } from './components/authorization';
function App() {
    return (
        <>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Routes>
                <Route element={<RequireAuth allowRoles={['admin']} />}>
                    <Route path='/' element={<Home />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/unauthorized' element={<Unauthorization />} />
            </Routes>
        </>
    )
}

function Unauthorization() {
    return <h1>Unauthorization page</h1>
}
function Login() {
    return <h1>login page</h1>
}
function Home() {
    return <h1>home page</h1>
}

export default App;
