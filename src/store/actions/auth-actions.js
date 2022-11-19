import { auth } from './../../constant';

export const login = payload => ({
    type: auth.LOGIN,
    payload
})