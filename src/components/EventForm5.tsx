import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormContext } from 'react-hook-form'
import { Button } from '@nextui-org/button'
import { Input, Textarea } from '@nextui-org/input'
import { Select, SelectItem } from '@nextui-org/select'
import {
    getKeyValue,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/table'
import { toast } from 'sonner'
import { updateFormData } from '@/store/formStore'
import { RootState } from '@/store'
import { EventDTO } from '@/models/event'
import { EventExpenseDTO, Expense, ExpenseFilter } from '@/models/expense'
import { getExpenses } from '@/services/expenseService'
import { AxiosError, AxiosResponse } from 'axios'

interface FormType {
    currentStep: number
}

interface Item extends Expense, EventExpenseDTO {}

export const EventForm5: React.FC<FormType> = ({ currentStep }) => {
    const {
        getValues,
        setValue,
        formState: { errors },
    } = useFormContext<EventDTO>()
    const dto = useSelector((state: RootState) => state.form.eventData)
    const dispatch = useDispatch()
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [total, setTotal] = useState<string>('')
    const [items, setItems] = useState<Item[]>([])
    const [cost, setCost] = useState<number>(0.0)
    const [ev, setEv] = useState<EventExpenseDTO>({
        idExpense: null,
        justification: '',
        value: '',
    })
    const columns = [
        { key: 'name', label: 'Nome' },
        { key: 'type', label: 'Tipo' },
        { key: 'value', label: 'Valor' },
        { key: 'actions', label: 'Ações' },
    ]

    useEffect(() => {
        if (expenses && expenses.length <= 0 && currentStep === 4) {
            getExpenses({} as ExpenseFilter)
                .then((res: AxiosResponse<Expense[]>) => {
                    setExpenses(res.data.content)
                })
                .catch((err: AxiosError) => {
                    toast.error(
                        (err?.response?.data as string) ||
                            'Erro ao buscar despesas!',
                        {
                            className:
                                'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                            duration: 3000,
                        },
                    )
                })
        }
    }, [currentStep, expenses])

    useEffect(() => {
        if(currentStep === 4) {
            dispatch(updateFormData({ cost: cost }))
            const value = formatToBRL(cost)
            setTotal(value)
        }
    }, [cost, dispatch, currentStep])

    useEffect(() => {
        const currentEv = dto.eventExpenses
        if (currentEv && expenses) {
            const items: Item[] = currentEv
                .map(ev => {
                    const matching = expenses.find(e => e.id === ev.idExpense)

                    if (matching) {
                        return {
                            ...ev,
                            ...matching,
                        }
                    }
                    return null
                })
                .filter(item => item !== null)

            items.forEach(i => {
                i.type = i.type.toString().toLowerCase()
                i.value = formatToBRL(i.value as number)
            })

            setItems(items)
        } else {
            setItems([])
        }
    }, [dto.eventExpenses, expenses])

    function formatToBRL(value: number): string {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value)
    }

    const addExpense = () => {
        if (ev.idExpense && ev.value && ev.justification) {
            const currentEventExpenses = getValues('eventExpenses') || []

            const matching = currentEventExpenses.find(
                i => i.idExpense === ev.idExpense,
            )

            if (matching) {
                toast('Essa despesa já foi adicionada!', {
                    className:
                        'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                    duration: 3000,
                })
                return
            }

            const updatedEventExpenses = [...currentEventExpenses, ev]

            setValue('eventExpenses', updatedEventExpenses)

            const parsedItemValue = parseFloat(ev.value as string)

            const sum = cost + parsedItemValue

            if (!isNaN(sum)) setCost(sum)

            dispatch(updateFormData({ eventExpenses: updatedEventExpenses }))

            setEv({ idExpense: null, justification: '', value: 0.0 })
        } else {
            toast('Preencha todos os campos!', {
                className:
                    'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                duration: 3000,
                description: 'Todos os campos são obrigatórios.',
            })
        }
    }

    function parseToNumber(value: string): number {
        let num = String(value).replace('R$', '').trim()
        num = num.replace(/\./g, '')
        num = num.replace(',', '.')
        return parseFloat(num)
    }

    function removeExpense(item: Item) {
        const currentEventExpenses = getValues('eventExpenses') || []

        const updatedEventExpenses = currentEventExpenses.filter(
            i => i.idExpense !== item.id,
        )

        const parsedItemValue = parseToNumber(item.value as string)
        const sub = cost - parsedItemValue

        if (!isNaN(sub)) setCost(sub > 0.0 ? sub : 0.0)

        setValue('eventExpenses', updatedEventExpenses)
        dispatch(updateFormData({ eventExpenses: updatedEventExpenses }))
    }

    return (
        <div className='flex h-auto w-full flex-col items-center justify-center space-y-5'>
            <div className='flex w-full flex-col items-center justify-center space-y-8 lg:flex-row lg:items-start lg:space-y-0'>
                <div className='flex w-full flex-col items-center space-y-3 lg:w-1/2'>
                    <div className='flex w-80 justify-center'>
                        <Select
                            label='Despesas*'
                            variant='bordered'
                            size='sm'
                            radius='md'
                            className='max-w-xs'
                            onChange={e =>
                                setEv({
                                    ...ev,
                                    idExpense: Number.parseInt(e.target.value),
                                })
                            }
                            classNames={{
                                label: 'text-secondary dark:text-dark-secondary',
                                trigger:
                                    'bg-transaparent border border-tertiary dark:border-dark-tertiary hover:border-primary dark:hover:border-dark-primary',
                                listboxWrapper: 'max-h-[400px]',
                                errorMessage: 'text-error',
                            }}
                            listboxProps={{
                                itemClasses: {
                                    base: [
                                        'rounded-md',
                                        'text-secondary dark:text-dark-secondary',
                                        'transition-opacity',
                                        'data-[selectable=true]:focus:bg-primary dark:data-[selectable=true]:focus:bg-dark-primary',
                                        'data-[selectable=true]:focus:text-background dark:data-[selectable=true]:focus:text-dark-background',
                                        'data-[pressed=true]:opacity-70',
                                    ],
                                },
                            }}
                            popoverProps={{
                                classNames: {
                                    base: 'before:bg-background before:dark:bg-dark-background',
                                    content:
                                        'p-0 border-small border-divider bg-background dark:bg-dark-background',
                                },
                            }}
                        >
                            {expenses.map(e => (
                                <SelectItem
                                    key={e.id as number}
                                    value={e.id as number}
                                    className='capitalize'
                                >
                                    {`${e.name} - ${e.type.toString().toLowerCase()}`}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className='flex w-80 justify-center'>
                        <Input
                            label='Valor da Despesa*'
                            size='sm'
                            variant='bordered'
                            type='number'
                            radius='md'
                            value={ev.value as string}
                            min={0}
                            isInvalid={errors?.eventExpenses ? true : false}
                            onChange={e =>
                                setEv({
                                    ...ev,
                                    value: Number(e.target.value),
                                })
                            }
                            classNames={{
                                input: ['bg-transparent'],
                                label: [
                                    'text-secondary dark:text-dark-secondary',
                                ],
                                inputWrapper: [
                                    'text-secondary dark:text-dark-secondary hover:text-primary dark:hover:text-dark-primary bg-transparent border border-tertiary dark:border-dark-tertiary hover:border-primary dark:hover:border-dark-primary',
                                ],
                                description: [
                                    'text-secondary dark:text-dark-secondary',
                                ],
                                errorMessage: ['text-error'],
                            }}
                        />
                    </div>
                    <div className='flex w-80 justify-center'>
                        <Textarea
                            label='Justificativa*'
                            variant='bordered'
                            placeholder='Qual o objetivo da participação no evento ?'
                            size='lg'
                            radius='md'
                            value={ev.justification}
                            onChange={e =>
                                setEv({
                                    ...ev,
                                    justification: e.target.value,
                                })
                            }
                            isInvalid={
                                errors?.eventExpenses && 'Input-error'
                                    ? true
                                    : false
                            }
                            classNames={{
                                input: ['bg-transparent'],
                                label: [
                                    'text-secondary dark:text-dark-secondary',
                                ],
                                inputWrapper: [
                                    'text-secondary dark:text-dark-secondary hover:text-primary dark:hover:text-dark-primary bg-transparent border border-tertiary dark:border-dark-tertiary hover:border-primary dark:hover:border-dark-primary',
                                ],
                                description: [
                                    'text-secondary dark:text-dark-secondary',
                                ],
                                errorMessage: ['text-error'],
                            }}
                        />
                    </div>
                    <Button
                        onClick={addExpense}
                        type='button'
                        size='lg'
                        radius='md'
                        className='mt-8 w-56 bg-success font-semibold text-background'
                    >
                        Adicionar
                    </Button>
                </div>
                <div className='flex w-full flex-col items-center lg:w-1/2'>
                    <Table
                        aria-label='Example table with dynamic content'
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
                        <TableHeader columns={columns}>
                            {column => (
                                <TableColumn key={column.key}>
                                    {column.label}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody
                            items={items}
                            emptyContent={'Nenhuma Despesa Adicionada!'}
                        >
                            {item => (
                                <TableRow key={item.idExpense}>
                                    {columnKey => (
                                        <TableCell className='capitalize'>
                                            {columnKey === 'actions' ? (
                                                <Button
                                                    onClick={() =>
                                                        removeExpense(item)
                                                    }
                                                    className='bg-error font-semibold text-background'
                                                >
                                                    Remover
                                                </Button>
                                            ) : (
                                                getKeyValue(item, columnKey)
                                            )}
                                        </TableCell>
                                    )}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <div className='mt-3 flex h-auto min-w-56 items-center rounded-md border border-tertiary px-2 py-4 text-xl font-semibold text-primary dark:border-dark-tertiary dark:text-dark-primary lg:w-1/2'>
                        {total}
                    </div>
                </div>
            </div>
        </div>
    )
}
