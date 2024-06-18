import { AxiosResponse } from 'axios'
import { instance } from './axiosConfig'
import { ProcedureDTO } from '@/models/procedure'

export const procedure = async (
    dto: ProcedureDTO,
): Promise<AxiosResponse<string>> => {
    const timeZoneOffSet = -new Date().getTimezoneOffset() / 60
    return await instance.post('/procedure', dto, {
        headers: {
            timezone: timeZoneOffSet,
        },
    })
}
