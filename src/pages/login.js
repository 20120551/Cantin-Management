import { useState } from "react";
import { useAuth } from "../hooks";
import { auth } from './../store/actions';
import { authService } from './../services';
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [authState, authDispatch] = useAuth();
    const handleLogin = async () => {
        try {
            const response = await authService.login(username, password);
            authDispatch(auth.login(response.data));
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </>
    )
}

export default Login;