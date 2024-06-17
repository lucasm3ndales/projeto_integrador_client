

export interface Expense {
    id: number | null,
    name: string,
    type: string | ExpenseType,
}

export interface EventExpenseDTO {
    idExpense: number | null,
    justification: string,
    value: number | string
}

export interface EventExpense {
    expense: Expense,
    id: number | null,
    justification: string,
    value: number | string,
    createdAt: EpochTimeStamp,
    updatedAt: EpochTimeStamp
}

export enum ExpenseType {
    OUTROS = 'OUTROS',
    TRANSPORTE = 'TRANSPORTE',
    ALIMENTACAO = 'ALIMENTACAO',
    HOSPEDAGEM = 'HOSPEDAGEM',
    IGRESSOS = 'IGRESSOS'
}

export interface ExpenseFilter {
    page?: number,
    size?: number,
    sort?: string,
    name?: string,
    type?: string
}
