import { auth } from './../../constant';
import { authService } from './../../services';

const authInitialState = {
    accessToken: '',
    roles: ['admin']
}

const authReducer = async (state, action) => {
    switch (action.type) {
        case auth.LOGIN:
            //call api to server
            const {
                username,
                password
            } = action.payload;

            const response = await authService.login(username, password);
            console.log(response);
            return { ...state }
        default:
            return { ...state }
    }
}

export { authInitialState };
export default authReducer;