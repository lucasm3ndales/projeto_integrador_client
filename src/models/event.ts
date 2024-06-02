import { AddressDTO } from './address'
import { DocumentDTO } from './document'
import { EventExpense } from './expense'

export interface EventDTO {
    name: string
    type: EventType | string
    periodicity: EventPeriodicity | string
    startDate: string
    endDate: string
    departureDate: string
    backDate: string
    goal: string
    participants: number
    cost: number
    origin: number
    destiny: number
    address: AddressDTO
    documents: DocumentDTO[]
    eventExpenses: EventExpense[]
}

export enum EventType {
    OUTROS = 'OUTROS',
    TECNOLOGIA = 'TECNOLOGIA',
    SIMPOSIO = 'SIMPOSIO',
    CONGRESSO = 'CONGRESSO',
    EXPOFEIRA = 'EXPOFEIRA',
    FEIRA_LIVRE = 'FEIRA_LIVRE',
}

export enum EventPeriodicity {
    ANUALMENTE = 'ANUALMENTE',
    SEMESTRALMENTE = 'SEMESTRALMENTE',
    TRIMESTRALMENTE = 'TRIMESTRALMENTE',
    SEMANALMENTE = 'SEMANALMENTE',
}

export enum EventStatus {
    ACEITO = 'ACEITO',
    PENDENTE = 'PESNDENTE',
    RECUSADO = 'RECUSADO',
}
