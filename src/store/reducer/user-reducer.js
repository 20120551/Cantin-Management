import { user } from './../../constant'

const userInitialState = {
    username: '',
    password: ''
}

const userReducer = (state, action) => {
    switch (action.type) {
        case user.GET_PROFILE:
            return action.payload?.data
        default:
            return { ...state }
    }
}

export { userInitialState };
export default userReducer;