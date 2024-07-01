import { AxiosResponse } from 'axios'
import { instance } from './axiosConfig'
import { UnityManagerUserDto } from '@/models/unityManager'

export const getUnityManagersByUnityIds = async (
    unityIds: number[],
): Promise<AxiosResponse<UnityManagerUserDto[]>> => {
    return await instance.post('/manager/unity', {unityIds})
}
