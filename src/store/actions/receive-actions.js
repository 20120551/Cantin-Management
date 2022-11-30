import { receive } from '../../constant';

export const getAllGoodsSaved = payload => ({
    type: receive.GET_SAVED,
    payload
})

export const addNote = payload => ({
    type: receive.ADD_NOTE,
    payload
})

