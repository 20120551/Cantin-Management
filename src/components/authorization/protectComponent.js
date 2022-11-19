import { useAuth } from "../../hooks";

function ProtectComponent({ children, allowRoles }) {
    const [authState] = useAuth();
    console.log(authState);
    const authorized = authState?.roles?.find((role) => allowRoles?.includes(role));
    const user = (!allowRoles && authState?.accessToken) ? true : false;
    return (
        authorized || user
            ? <>
                {children}
            </>
            : <>
                {/* render nothing */}
            </>
    )
}

export default ProtectComponent;