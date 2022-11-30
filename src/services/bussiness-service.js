import axios from '../lib/axios';

export const statistic = async () => {
    try {
        const response = await axios.get('/auth/login')
        return response?.data;
    } catch (err) {
        throw err;
    }
}



