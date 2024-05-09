import { AuthDTO, Credentials } from '@/models/user'
import { instance } from './axiosConfig'
import { AxiosResponse } from 'axios'

export const authenticate = async (dto: Credentials): Promise<AxiosResponse<AuthDTO>> => {
    return await instance.post('/auth', dto)
}
