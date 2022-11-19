import axios from 'axios';
const API_URL = 'http://localhost:8800/api/v1/auth';

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password
        })
        return response;
    } catch (err) {
        // do something with err
    }
}