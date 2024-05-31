

export interface Expense {
    id: number,
    name: string,
    type: string | ExpenseType,
}

export interface EventExpense {
    idExpense: number | null,
    justification: string,
    value: number | string
}

export enum ExpenseType {
    OUTROS = 'outros',
    TRANSPORTE = 'transporte',
    ALIMENTACAO = 'alimentação',
    HOSPEDAGEM = 'hospedagem',
    IGRESSOS = 'ingressos'
}

export interface ExpenseFilter {
    page?: number,
    size?: number,
    sort?: string,
    name?: string,
    type?: string
}
