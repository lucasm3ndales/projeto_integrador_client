import { AddressDTO } from './address'
import { DocumentDTO } from './document'
import { EventExpense } from './expense'

export interface EventDTO {
    name: string
    type: string
    periodicity: string
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
    OUTROS = 'outros',
    TECNOLOGIA = 'tecnologia',
    SIMPOSIO = 'simpósio',
    CONGRESSO = 'congresso',
    EXPOFEIRA = 'expofeira',
    FEIRA_LIVRE = 'feira livre',
}

export enum EventPeriodicity {
    ANUALMENTE = 'anualmente',
    SEMESTRALMENTE = 'semestralmente',
    TRIMESTRALMENTE = 'trimestralmente',
    SEMANALMENTE = 'semanalmente',
}

export enum EventStatus {
    ACEITO = 'aceito',
    PENDENTE = 'pendente',
    RECUSADO = 'recusado',
}
