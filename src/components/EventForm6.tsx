import { EventExpenseDTO, Expense, ExpenseFilter } from '@/models/expense'
import { Unity, UnityFilter, UnityType } from '@/models/unity'
import { getExpenses } from '@/services/expenseService'
import { getUnities } from '@/services/unityService'
import { RootState } from '@/store'
import { updateFormData } from '@/store/formStore'
import { Input, Textarea } from '@nextui-org/input'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import {
    getKeyValue,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/table'
import { AxiosError, AxiosResponse } from 'axios'
import { format } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

interface FormType {
    currentStep: number
}

interface Item extends Expense, EventExpenseDTO {}

export const EventForm6: React.FC<FormType> = ({ currentStep }) => {
    const user = useSelector((state: RootState) => state.user.user)
    const dto = useSelector((state: RootState) => state.form.eventData)
    const dispatch = useDispatch()
    const [items, setItems] = useState<Item[]>([])
    const [total, setTotal] = useState<string>('')
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [unities, setUnities] = useState<Unity[]>([])

    const startDate = useMemo(() => {
        if(dto.startDate) {
            return format(dto.startDate, 'dd/MM/yyyy')
        }
    }, [dto])

    const endDate = useMemo(() => {
        if(dto.endDate) {
            return format(dto.endDate, 'dd/MM/yyyy')
        }
    }, [dto])

    const departureDate = useMemo(() => {
        if(dto.departureDate) {
            return format(dto.departureDate, 'dd/MM/yyyy')
        }
    }, [dto])

    const backDate = useMemo(() => {
        if(dto.backDate) {
            return format(dto.backDate, 'dd/MM/yyyy')
        }
    }, [dto])

    const columnsDocument = [
        { key: 'name', label: 'Nome' },
        { key: 'type', label: 'Tipo' },
    ]

    const columnsExpenses = [
        { key: 'name', label: 'Nome' },
        { key: 'type', label: 'Tipo' },
        { key: 'value', label: 'Valor' },
    ]

    useEffect(() => {
        if (currentStep === 5) {
            const value = formatToBRL(dto.cost as number)
            setTotal(value)
        }
    }, [dto, total, currentStep])
    
    useEffect(() => {
        if(user && currentStep === 5) {
            dispatch(updateFormData({ origin: user.id }))
        }
    }, [dispatch, user, currentStep])

    useEffect(() => {
        const unityFilter: UnityFilter = {
            type: UnityType.DEPARTAMENTO,
        }

        if (unities && unities.length <= 0 && currentStep === 5) {
            getUnities(unityFilter)
                .then((res: AxiosResponse<Unity[]>) => {
                    setUnities(res.data.content)
                })
                .catch((err: AxiosError) => {
                    toast.error(
                        (err?.response?.data as string) ||
                            'Erro ao buscar unidades!',
                        {
                            className:
                                'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                            duration: 3000,
                        },
                    )
                })
        }
    }, [unities, currentStep])

    useEffect(() => {
        if (
            expenses &&
            expenses.length <= 0 &&
            dto.eventExpenses &&
            dto.eventExpenses.length > 0 &&
            currentStep === 5
        ) {
            getExpenses({search: ''} as ExpenseFilter)
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
    }, [expenses, currentStep, dto.eventExpenses])

    useEffect(() => {
        if (
            dto.eventExpenses &&
            dto.eventExpenses.length > 0 &&
            expenses &&
            expenses.length > 0 &&
            currentStep === 5
        ) {
            const items: Item[] = dto.eventExpenses
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
    }, [currentStep, dto.eventExpenses, expenses])

    function formatToBRL(value: number): string {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value)
    }

    return (
        <div className='flex h-[475px] w-full'>
            <ScrollShadow className='h-[200] w-full p-2'>
                <div className='flex flex-col'>
                    <div className='mb-3 flex text-lg font-semibold text-secondary dark:text-dark-secondary'>
                        Sobre o Evento
                    </div>
                    <div className='mb-5 flex flex-col items-center space-y-4 lg:space-y-0 lg:flex-row lg:space-x-5'>
                        <div className='lg:w-72 md:w-2/3 w-full'>
                            <Input
                                isReadOnly
                                label='Nome do Evento'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                value={dto.name}
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
                        <div className='lg:w-72 md:w-2/3 w-full'>
                            <Input
                                isReadOnly
                                label='Tipo do evento'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                value={dto.type?.toString()}
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
                        <div className='lg:w-72 md:w-2/3 w-full'>
                            <Input
                                isReadOnly
                                label='Periodicidade'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                value={dto.periodicity?.toString()}
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
                        <div className='lg:w-72 md:w-2/3 w-full'>
                            <Input
                                isReadOnly
                                label='N° de participantes'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                value={dto.participants?.toString()}
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
                    </div>
                    <div className='mb-5 flex flex-col items-center space-y-4 lg:space-y-0 lg:flex-row lg:space-x-5'>
                        <div className='lg:w-72 md:w-2/3 w-full'>
                            <Input
                                isReadOnly
                                label='Data de início'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                value={startDate}
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
                        <div className='lg:w-72 md:w-2/3 w-full'>
                            <Input
                                isReadOnly
                                label='Data de fim'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                value={endDate}
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
                        <div className='lg:w-72 md:w-2/3 w-full'>
                            <Input
                                isReadOnly
                                label='Data de Ida'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                value={departureDate}
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
                        <div className='lg:w-72 md:w-2/3 w-full'>
                            <Input
                                isReadOnly
                                label='Data de volta'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                value={backDate}
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
                    </div>
                    <hr className='mb-5 w-full border-tertiary dark:border-dark-tertiary' />
                    <div className='mb-3 flex text-lg font-semibold text-secondary dark:text-dark-secondary'>
                        Endereço
                    </div>
                    <div className='mb-5 flex flex-col items-center space-y-4 lg:space-y-0 lg:flex-row lg:space-x-5'>
                        <div className='lg:w-72 md:w-2/3 w-full'>
                            <Input
                                isReadOnly
                                label='País'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                value={dto.address?.country}
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
                        <div className='lg:w-72 md:w-2/3 w-full'>
                            <Input
                                isReadOnly
                                label='Estado/Província'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                value={dto.address?.state}
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
                        <div className='lg:w-72 md:w-2/3 w-full'>
                            <Input
                                isReadOnly
                                label='Cidade'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                value={dto.address?.city}
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
                        <div className='lg:w-72 md:w-2/3 w-full'>
                            <Input
                                isReadOnly
                                label='Bairro'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                value={dto.address?.district}
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
                    </div>
                    <div className='mb-5 flex flex-col items-center space-y-4 lg:space-y-0 lg:flex-row lg:space-x-5'>
                        <div className='lg:w-72 md:w-2/3 w-full'>
                            <Input
                                isReadOnly
                                label='Rua'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                value={dto.address?.street}
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
                        <div className='lg:w-72 md:w-2/3 w-full'>
                            <Input
                                isReadOnly
                                label='Número'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                value={
                                    dto.address?.num ? dto.address.num : '--'
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
                        <div className='lg:w-72 md:w-2/3 w-full'>
                            <Input
                                isReadOnly
                                label='Complemento'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                value={
                                    dto.address?.complement
                                        ? dto.address.complement
                                        : '--'
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
                    </div>
                    <hr className='mb-5 w-full border-tertiary dark:border-dark-tertiary' />
                    <div className='mb-3 flex text-lg font-semibold text-secondary dark:text-dark-secondary'>
                        Objetivo
                    </div>
                    <div className='mb-5 flex lg:w-2/3 w-full'>
                        <Textarea
                            isReadOnly
                            label='Objetivo'
                            variant='bordered'
                            size='lg'
                            radius='md'
                            minRows={6}
                            value={dto.goal}
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
                    <hr className='mb-5 w-full border-tertiary dark:border-dark-tertiary' />
                    <div className='mb-3 flex text-lg font-semibold text-secondary dark:text-dark-secondary'>
                        Documentos
                    </div>
                    <div className='mb-5 flex lg:w-2/3 w-full'>
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
                            <TableHeader columns={columnsDocument}>
                                {column => (
                                    <TableColumn key={column.key}>
                                        {column.label}
                                    </TableColumn>
                                )}
                            </TableHeader>
                            <TableBody
                                items={dto.documents ? dto.documents : []}
                                emptyContent={'Nenhum Documento Adicionado!'}
                            >
                                {item => (
                                    <TableRow key={item.name}>
                                        {columnKey => (
                                            <TableCell className='capitalize'>
                                                {getKeyValue(item, columnKey)}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <hr className='mb-5 w-full border-tertiary dark:border-dark-tertiary' />
                    <div className='mb-3 flex text-lg font-semibold text-secondary dark:text-dark-secondary'>
                        Despesas
                    </div>
                    <div className='mb-5 flex lg:flex-row flex-col space-y-5 lg:space-y-0 w-full items-center justify-between'>
                        <div className='flex lg:w-2/3 w-full'>
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
                                <TableHeader columns={columnsExpenses}>
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
                                                    {getKeyValue(
                                                        item,
                                                        columnKey,
                                                    )}
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div className='ms-4 flex h-20 min-h-20 lg:w-1/4 w-1/2 items-center justify-center rounded-md border border-tertiary bg-transparent p-2 text-xl font-semibold text-primary dark:border-dark-tertiary dark:text-dark-primary'>
                            Custo Total: {total}
                        </div>
                    </div>
                </div>
            </ScrollShadow>
        </div>
    )
}
