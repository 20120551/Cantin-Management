import { privateAxios } from './../lib/axios';
const accessToken = JSON.parse(localStorage.getItem('accessToken'));

export const createWaitingOrder = async ({ studentId, studentName, timeReceive }) => {
    try {
        const response = await privateAxios.post('/order/create', {
            studentId,
            studentName,
            timeReceive
        })
        return response?.data;
    } catch (err) {
        console.log(err);
    }
}

export const getOrderById = async ({ orderId }) => {
    try {
        const response = await privateAxios.get(`/order/${orderId}`);
        return response?.data;
    } catch (err) {
        console.log(err);
    }
}

export const getOrderResult = async ({ result }) => {
    try {
        console.log(result);
        const response = await privateAxios.get(`/order/result/${result}`);
        return response?.data;
    } catch (err) {
        console.log(err);
    }
}

export const getOrderBydate = async ({ date }) => {
    try {
        const response = await privateAxios.get('/order', {
            date
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response?.data;
    } catch (err) {
        console.log(err);
    }
}

export const deleteOrder = async ({ orderId }) => {
    try {
        const response = await privateAxios.delete(`/order/${orderId}`);
        return response?.data;
    } catch (err) {
        console.log(err);
    }
}