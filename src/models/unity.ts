import { UnityManager } from './unityManager'

export interface UnityFilter {
    page?: number,
    sort?: string,
    size?: number,
    type: UnityType
    search?: string
}

export enum UnityType {
    DEPARTAMENTO = 'DEPARTAMENTO',
    REITORIA = 'REITORIA',
}

export interface Unity {
    id: number | null
    name: string
    type: string | UnityType
    unityManagers: UnityManager[]
}

export interface UnityUpdateDto {
    idUnity: number | null,
    idUser: number | null,
    name: string
}

export interface UnitySaveDTO {
    idUser:  number | null,
    name: string
    type: UnityType
}
