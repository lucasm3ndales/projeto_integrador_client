import { AxiosResponse } from 'axios'
import { instance } from './axiosConfig'

export const dowloadDocuments = async (
    id: number,
): Promise<AxiosResponse<ArrayBuffer>> => {
    return instance.get(`/document/download/${id}`)
}
