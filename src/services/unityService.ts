import { Unity, UnityFilter, UnitySaveDTO, UnityUpdateDto } from '@/models/unity'
import { instance } from './axiosConfig'
import { AxiosResponse } from 'axios'

export const getUnities = async (filter: UnityFilter): Promise<AxiosResponse<Unity[]>> => {
    return await instance.get('/unity/unities', { params: filter })
}

export const getUnity = async (id: number): Promise<AxiosResponse<Unity>> => {
    return await instance.get(`/unity/${id}`)
}

export const saveUnity = async (dto: UnitySaveDTO): Promise<AxiosResponse<string>> => {
    const timezoneOffSet = -new Date().getTimezoneOffset() / 60
    return await instance.post('/unity/save', dto, {
        headers: {
            timezone: timezoneOffSet,
        },
    })
}

export const updateUnity = async (dto: UnityUpdateDto): Promise<AxiosResponse<string>> => {
    const timezoneOffSet = -new Date().getTimezoneOffset() / 60
    return await instance.put('/unity/update', dto, {
        headers: {
            timezone: timezoneOffSet,
        },
    })
}
