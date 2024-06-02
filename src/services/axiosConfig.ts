import { AuthDTO } from '@/models/user'
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

export const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 2500,
    headers: {
        'Content-Type': 'application/json',
    },
})

instance.interceptors.request.use(
    (req): InternalAxiosRequestConfig => {
        const userStr = localStorage.getItem('user')
        if (userStr) {
            const user = JSON.parse(userStr) as AuthDTO
            const jwt = user.token
            req.headers.Authorization = `Bearer ${jwt}`
        }
        return req
    },
    (err: AxiosError): Promise<AxiosError> => {
        return Promise.reject(err)
    },
)

instance.interceptors.response.use(
    res => res,
    err => {
        if (err?.response?.status === 403) {
            localStorage.removeItem('user')
            window.location.replace('/')

        }
        return Promise.reject(err)
    },
)
