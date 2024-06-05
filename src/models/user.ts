import { UnityManager } from './unityManager'

export interface Credentials {
    username: string
    password: string
}

export interface AuthDTO {
    id: number
    active: boolean
    name: string
    token: string
    role: string | Role
}

export enum Role {
    SERVIDOR = 'SERVIDOR',
    CHEFE_DEPARTAMENTO = 'CHEFE_DEPARTAMENTO',
    PRO_REITOR = 'PRO_REITOR',
}

export interface User {
    id: number
    name: string
    email: string
    phone: string
    siape: string
    active: boolean
    role: Role | string
    unityManagers: UnityManager[]
}

export interface UserDTO {
    name: string
    email: string
    phone: string
    siape: string
    username: string
    password: string
}
