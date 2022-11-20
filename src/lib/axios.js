import axios from "axios";
const API_URL = 'http://localhost:8800/api/v1/';

export const privateAxios = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

export default axios.create({
    baseURL: API_URL
})
