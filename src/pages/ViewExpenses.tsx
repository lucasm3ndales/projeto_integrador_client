import { ExpenseSaveForm } from '@/components/ExpenseSaveForm'
import { ExpenseUpdateForm } from '@/components/ExpenseUpdateForm'
import { Expense, ExpenseFilter } from '@/models/expense'
import { getExpenses } from '@/services/expenseService'
import { Input } from '@nextui-org/input'
import { Pagination } from '@nextui-org/react'
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/table'
import { AxiosError, AxiosResponse } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Pageable {
    page: number
    sort: string
    size: number
    totalPages: number
}

export const ViewExpenses = () => {
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [search, setSearch] = useState<string>('')
    const [pageable, setPageable] = useState<Pageable>({
        page: 0,
        sort: '',
        size: 10,
        totalPages: 0,
    })
    const [filter, setFilter] = useState<ExpenseFilter>({
        sort: '',
        page: 0,
        size: 10,
        search: '',
    })
    const columnExpenses = [
        { key: 'name', label: 'NOME' },
        { key: 'type', label: 'TIPO' },
        { key: 'update', label: 'ALTERAR' },
    ]

    const renderTableExpense = useCallback((expense, columnKey) => {
        const cellValue = expense[columnKey]

        switch (columnKey) {
            case 'update':
                return <ExpenseUpdateForm id={expense.id}/>
                break
            default:
                return cellValue
                break
        }
    }, [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleExpense = useCallback(async () => {
        await getExpenses(filter)
            .then((res: AxiosResponse<Expense[] | any>) => {
                setExpenses(res.data.content)
                setPageable({
                    size: res.data.size,
                    sort: res.data.sort,
                    page: res.data.number,
                    totalPages: res.data.totalPages,
                })
            })
            .catch((err: AxiosError) => {
                toast.error(
                    (err?.response?.data as string) ||
                        'Despesas não encontradas!',
                    {
                        className:
                            'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                        duration: 3000,
                    },
                )
            })
    }, [filter])

    useEffect(() => {
        handleExpense()
    }, [handleExpense])

    useEffect(() => {
        const handler = setTimeout(() => {
            if (search.trim() !== filter.search) {
                setFilter(state => ({
                    ...state,
                    search: search.trim(),
                }))
                handleExpense()
            }
        }, 600)

        return () => clearTimeout(handler)
    }, [search, filter.search, handleExpense])

    useEffect(() => {
        if (pageable.page != filter.page) {
            setFilter(state => ({
                ...state,
                page: pageable.page,
            }))
        }
    }, [pageable.page, filter.page, handleExpense])

    return (
        <main className='flex w-full justify-center lg:ms-12'>
            <div className='mt-5 flex w-full flex-col items-center lg:mt-8  lg:w-2/3'>
                <div className='flex h-auto w-full flex-col items-center  space-y-3 rounded-md border border-tertiary px-2 py-4 shadow-lg dark:border-dark-tertiary md:w-3/5 lg:w-[450px]'>
                    <Input
                        label='Pesquisar'
                        variant='bordered'
                        size='sm'
                        onChange={e => setSearch(e.target.value)}
                        type='text'
                        radius='md'
                        classNames={{
                            input: ['bg-transparent'],
                            label: ['text-secondary dark:text-dark-secondary'],
                            inputWrapper: [
                                'text-secondary dark:text-dark-secondary hover:text-primary dark:hover:text-dark-primary bg-transparent border border-tertiary dark:border-dark-tertiary hover:border-primary dark:hover:border-dark-primary',
                            ],
                            description: [
                                'text-secondary dark:text-dark-secondary',
                            ],
                            errorMessage: ['text-error'],
                        }}
                    />
                    <ExpenseSaveForm />
                </div>
                <div className='mt-8 flex h-auto w-full flex-col items-center space-y-3 rounded-md border border-tertiary px-2 py-4 shadow-lg dark:border-dark-tertiary'>
                    <Table
                        aria-label='Despesas'
                        classNames={{
                            wrapper: [
                                'bg-transparent border border-tertiary dark:border-dark-tertiary rounded-md',
                            ],
                            th: [
                                'text-secondary dark:text-dark-secondary bg-transparent',
                            ],
                            emptyWrapper: [
                                'text-secondary dark:text-dark-secondary',
                            ],
                        }}
                    >
                        <TableHeader columns={columnExpenses}>
                            {column => (
                                <TableColumn key={column.key}>
                                    {column.label}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody
                            items={expenses}
                            emptyContent={'Nenhuma Despesa Encontrada!'}
                        >
                            {expense => (
                                <TableRow key={expense.id}>
                                    {columnKey => (
                                        <TableCell className='capitalize'>
                                            {renderTableExpense(
                                                expense,
                                                columnKey,
                                            )}
                                        </TableCell>
                                    )}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                {expenses && expenses.length > 0 && (
                    <div className='mt-8 flex h-auto w-auto flex-col items-center space-y-3 rounded-md border border-tertiary px-2 py-4 shadow-lg dark:border-dark-tertiary'>
                        <Pagination
                            showShadow
                            size='md'
                            variant='flat'
                            total={pageable.totalPages}
                            page={pageable.page + 1}
                            onChange={(p: number) =>
                                setPageable(state => ({
                                    ...state,
                                    page: p - 1,
                                }))
                            }
                            classNames={{
                                wrapper:
                                    'bg-background dark:bg-dark-background',
                                item: 'rounded-md text-secondary dark:text-dark-secondary bg-transparent shadow-none',
                                cursor: 'bg-primary dark:bg-dark-primary text-background dark:text-dark-background',
                            }}
                        />
                    </div>
                )}
            </div>
        </main>
    )
}
