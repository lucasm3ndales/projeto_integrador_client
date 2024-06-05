import { Unity } from './unity'
import { User } from './user'

export interface UnityManager {
    id: number
    startedOn: EpochTimeStamp | string
    user: User
    unity: Unity
}
