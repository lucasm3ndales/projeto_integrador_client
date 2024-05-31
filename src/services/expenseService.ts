import { Expense, ExpenseFilter } from '@/models/expense'
import { AxiosResponse } from 'axios'
import { instance } from './axiosConfig'


export const getExpenses = async (filters: ExpenseFilter): Promise<AxiosResponse<Expense[]>> => {
    return await instance.get('/expense/expenses', { params:  filters  })
}
