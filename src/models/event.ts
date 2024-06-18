import { Address, AddressDTO } from './address'
import { DocumentDTO } from './document'
import { EventExpense, EventExpenseDTO } from './expense'
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
    eventExpenses: EventExpenseDTO[]
}

export interface Event {
    id: number,
    name: string,
    type: EventType,
    periodicity: EventPeriodicity,
    startDate: string,
    endDate: string,
    departureDate: string,
    backDate: string,
    goal: string,
    participants: number,
    cost: number,
    archived: boolean,
    contributionDep: number,
    contributionReit: number
    status: EventStatus,
    address: Address,
    procedures: Procedure[],
    eventExpenses: EventExpense[],
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

export interface ContributionDTO {
    eventId: number | null,
    userId: number | null,
    contribution: number | string
}

export interface EventStatusDTO {
    eventId: number | null,
    userId: number | null,
    status: EventStatus
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
