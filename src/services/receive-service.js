import { privateAxios } from '../lib/axios';


export const addNote = async (noteInfo) => {
    try {
        const response = await privateAxios.post('receive/addNote', {
           noteInfo
        })
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const getStoreRoom = async () => {
    try {
        const response = await privateAxios.get('receive/saved')
        return response?.data;
    } catch (err) {
        throw err;
    }
}





