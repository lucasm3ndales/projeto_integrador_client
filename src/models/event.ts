import { DateValue } from '@nextui-org/react'
import { Address, AddressDTO } from './address'
import { DocumentDTO } from './document'
import { EventExpense } from './expense'
import { Procedure } from './procedure'

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

export interface Event {
    id: number,
    name: string
    type: EventType
    periodicity: EventPeriodicity
    startDate: string
    endDate: string
    departureDate: string
    backDate: string
    goal: string
    participants: number
    cost: number,
    archived: boolean,
    status: EventStatus
    address: Address
    procedures: Procedure[]
    eventExpenses: EventExpense[]
}

export interface EventFilter {
    sort?: string,
    page?: number,
    size?: number,
    type?: string,
    name?: string,
    periodicity?: string,
    status?: string,
    startDate?: string,
    endDate?: string,
    archived: boolean
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
    MENSALMENTE = 'MENSALMENTE'
}

export enum EventStatus {
    ACEITO = 'ACEITO',
    PENDENTE = 'PENDENTE',
    RECUSADO = 'RECUSADO',
}
