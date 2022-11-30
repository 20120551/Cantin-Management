import axios from './../lib/axios';

export const login = async (username, password) => {
    try {
        const response = await axios.post('/auth/login', {
            username,
            password
        })
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const forgotPassword = async (email) => {
    try {
        const response = await axios.post('/auth/forgot-password', {
            email,
        })
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const verifyKey = async (key) => {
    try {
        const response = await axios.post('/auth/verify-key', {
            key,
        })
        return response?.data;
    } catch (err) {
        throw err;
    }
}


