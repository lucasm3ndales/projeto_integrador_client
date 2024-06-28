import { Expense, ExpenseDTO, ExpenseFilter } from '@/models/expense'
import { AxiosResponse } from 'axios'
import { instance } from './axiosConfig'


export const getExpenses = async (filters: ExpenseFilter): Promise<AxiosResponse<Expense[]>> => {
    return await instance.get('/expense/expenses', { params:  filters  })
}

export const saveExpense = async (dto: ExpenseDTO): Promise<AxiosResponse<string>> => {
    return await instance.post('/expense/save', dto)
}

export const updateExpense = async (dto: Expense): Promise<AxiosResponse<string>> => {
    return await instance.put('/expense/update', dto)
}

export const getExpense = async (id: number): Promise<AxiosResponse<Expense>> => {
    return await instance.get(`/expense/${id}`)
}
