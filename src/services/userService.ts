import { UserDTO } from '@/models/user'
import { instance } from './axiosConfig'
import { AxiosResponse } from 'axios'

export const saveUser = async (dto: UserDTO): Promise<AxiosResponse<string>> => {
    return await instance.post('/user/save', dto)
}
