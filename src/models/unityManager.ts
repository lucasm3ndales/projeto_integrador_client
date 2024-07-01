import { Unity } from './unity'
import { User } from './user'

export interface UnityManager {
    id: number
    startedOn: EpochTimeStamp | string
    leftOn: EpochTimeStamp | string
    user: User
    unity: Unity
}

export interface UnityManagerUserDto {
    id: number
    unityId: number,
    userId: number,
    manager: string,
}
