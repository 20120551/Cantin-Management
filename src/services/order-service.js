import { privateAxios } from './../lib/axios';


export const createWaitingOrder = async ({ studentId, studentName, timeReceive }) => {
    try {
        const response = await privateAxios.post('/order/create', {
            studentId,
            studentName,
            timeReceive
        })
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const changeOrderState = async ({ orderId, state }) => {
    try {
        const response = await privateAxios.post(`/order/${orderId}`, { state });
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const getOrderById = async ({ orderId }) => {
    try {
        const response = await privateAxios.get(`/order/${orderId}`);
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const getOrderResult = async ({ result, key }) => {
    try {
        const response = await privateAxios.get(`/order/result/${result}?key=${key}`);
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const getOrderBydate = async ({ date }) => {
    try {
        const response = await privateAxios.post('/order', { date });
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const deleteOrder = async ({ orderId }) => {
    try {
        const response = await privateAxios.delete(`/order/${orderId}`);
        return response?.data;
    } catch (err) {
        throw err;
    }
}