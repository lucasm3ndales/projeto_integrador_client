import { Document } from './document'
import { User } from './user'

export interface Procedure {
    id: number
    createdAt: EpochTimeStamp | Date
    origin: User
    destiny: User
    documents: Document[]
}
