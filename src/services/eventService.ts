import { EventDTO } from '@/models/event'
import { instance } from './axiosConfig'
import { AxiosResponse } from 'axios'

export const saveEvent = async (dto: Partial<EventDTO>): Promise<AxiosResponse<string>> => {
    const timeZoneOffSet = -(new Date().getTimezoneOffset()) / 60
    return (await instance.post('/event/save', dto, {
        headers: {
            'timezone': timeZoneOffSet,
        },
    }))
}
