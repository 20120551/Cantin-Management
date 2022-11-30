import { user } from '../../constant';

export const getProfile = payload => ({
    type: user.GET_PROFILE,
    payload
})

