import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks';

// protect route
function ProtectRoute({ allowRoles }) {
    const [authState] = useAuth();
    const location = useLocation();
    return (
        authState?.roles?.find((role) => allowRoles?.includes(role))
            ? <Outlet />
            : authState?.accessToken
                ? <Navigate to='/unauthorized' state={{ from: location }} replace />
                : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default ProtectRoute;