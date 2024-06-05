import { Document } from './document'
import { User } from './user'

export interface Procedure {
    id: number
    createdAt: EpochTimeStamp | string
    origin: User
    destiny: User
    documents: Document[]
}
