import { Unity, UnityFilter } from '@/models/unity'
import { instance } from './axiosConfig'
import { AxiosResponse } from 'axios'

export const getUnities = async (filter: UnityFilter): Promise<AxiosResponse<Unity[]>> => {
    return await instance.get('/unity/unities', { params: filter })
}
