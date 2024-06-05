import { Event, EventDTO, EventFilter } from '@/models/event'
import { instance } from './axiosConfig'
import { AxiosResponse } from 'axios'

export const saveEvent = async (
    dto: Partial<EventDTO>,
): Promise<AxiosResponse<string>> => {

    const timeZoneOffSet = -new Date().getTimezoneOffset() / 60

    return await instance.post('/event/save', dto, {
        headers: {
            timezone: timeZoneOffSet,
        },
    })
}

export const getEvents = async (
    id: number,
    filter: EventFilter,
): Promise<AxiosResponse<Event[]>> => {

    return await instance.get(`/event/events/${id}`, { params: filter })
}
