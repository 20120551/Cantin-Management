import { privateAxios } from './../lib/axios';

export const signUp = async (username, password) => {
    try {
        const response = await privateAxios.post('/user/signup', {
            username,
            password
        })
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const getProfile = async () => {
    try {
        const response = await privateAxios.get('/user/profile')
        return response?.data;
    } catch (err) {
        throw err;
    }
}

