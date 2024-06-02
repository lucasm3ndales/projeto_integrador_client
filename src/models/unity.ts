import { UnityManager } from './unityManager'

export interface UnityFilter {
    name?: string
    type: string
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

export interface UnityDTO {
    name: string
    type: string | UnityType
}
