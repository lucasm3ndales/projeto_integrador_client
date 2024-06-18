import { ContributionDTO, Event, EventDTO, EventFilter, EventStatusDTO } from '@/models/event'
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
): Promise<AxiosResponse<Event[] | any>> => {

    return await instance.get(`/event/events/${id}`, { params: filter })
}

export const getEvent = async (id: number): Promise<AxiosResponse<Event>> => {
    return await instance.get(`/event/${id}`)
}

export const contributeToEvent = async (dto: ContributionDTO): Promise<AxiosResponse<string>> => {
    return await instance.put('/event/update/contribute', dto)
}

export const changeEventStatus = async (dto: EventStatusDTO): Promise<AxiosResponse<string>> => {

    const timeZoneOffSet = -new Date().getTimezoneOffset() / 60
    
    return await instance.put('/event/update/status',dto, {
        headers: {
            timezone: timeZoneOffSet,
        },
    })
}