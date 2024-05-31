import { EventDTO } from '@/models/event'
import { EventExpense, Expense, ExpenseFilter } from '@/models/expense'
import { Unity, UnityFilter, UnityType } from '@/models/unity'
import { getExpenses } from '@/services/expenseService'
import { getUnities } from '@/services/unityService'
import { RootState } from '@/store'
import { updateFormData } from '@/store/formStore'
import { Input, Textarea } from '@nextui-org/input'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
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
import { AxiosError, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

interface FormType {
    currentStep: number
}

interface Item extends Expense, EventExpense {}

export const EventForm6: React.FC<FormType> = ({currentStep}) => {
    const {
        register,
    } = useFormContext<EventDTO>()
    const dto = useSelector((state: RootState) => state.form.eventData)
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user.user)
    const [items, setItems] = useState<Item[]>([])
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [unities, setUnities] = useState<Unity[]>([])

    const unityFilter: UnityFilter = {
        type: UnityType.DEPARTAMENTO,
    }

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
        if(user && currentStep === 5) {
            dispatch(updateFormData({origin: user.id}))
        }
    }, [dispatch, user, currentStep])

    useEffect(() => {
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
    }, [expenses, currentStep, dto.eventExpenses])

    function formatToBRL(value: number): string {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value)
    }

    useEffect(() => {
        if (
            dto.eventExpenses &&
            dto.eventExpenses.length > 0 &&
            expenses &&
            expenses.length > 0 && currentStep === 5
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

    return (
        <div className='flex w-full h-[475px]'>
            <ScrollShadow className='h-[200] w-full p-2'>
                <div className='flex flex-col'>
                    <div className='mb-3 flex text-lg font-semibold text-secondary dark:text-dark-secondary'>
                        Sobre o Evento
                    </div>
                    <div className='mb-5 flex space-x-5'>
                        <div className='w-72'>
                            <Input
                                isReadOnly
                                label='Nome do Evento'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                defaultValue={dto.name}
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
                        <div className='w-72'>
                            <Input
                                isReadOnly
                                label='Tipo do evento'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                defaultValue={dto.type?.toString()}
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
                        <div className='w-72'>
                            <Input
                                isReadOnly
                                label='Periodicidade'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                defaultValue={dto.periodicity?.toString()}
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
                        <div className='w-72'>
                            <Input
                                isReadOnly
                                label='N° de participantes'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                defaultValue={dto.participants?.toString()}
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
                    <div className='mb-5 flex space-x-5'>
                        <div className='w-72'>
                            <Input
                                isReadOnly
                                label='Data de início'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                defaultValue={dto.startDate}
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
                        <div className='w-72'>
                            <Input
                                isReadOnly
                                label='Data de fim'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                defaultValue={dto.endDate}
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
                        <div className='w-72'>
                            <Input
                                isReadOnly
                                label='Data de Ida'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                defaultValue={dto.departureDate}
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
                        <div className='w-72'>
                            <Input
                                isReadOnly
                                label='Data de volta'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                defaultValue={dto.backDate}
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
                    <div className='mb-5 flex space-x-5'>
                        <div className='w-72'>
                            <Input
                                isReadOnly
                                label='País'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                defaultValue={dto.address?.country}
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
                        <div className='w-72'>
                            <Input
                                isReadOnly
                                label='Estado/Província'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                defaultValue={dto.address?.state}
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
                        <div className='w-72'>
                            <Input
                                isReadOnly
                                label='Cidade'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                defaultValue={dto.address?.city}
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
                        <div className='w-72'>
                            <Input
                                isReadOnly
                                label='Bairro'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                defaultValue={dto.address?.district}
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
                    <div className='mb-5 flex space-x-5'>
                        <div className='w-72'>
                            <Input
                                isReadOnly
                                label='Rua'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                defaultValue={dto.address?.street}
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
                        <div className='w-72'>
                            <Input
                                isReadOnly
                                label='Número'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                defaultValue={
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
                        <div className='w-1/3'>
                            <Input
                                isReadOnly
                                label='Complemento'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                defaultValue={
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
                    <div className='mb-5 flex w-2/3'>
                        <Textarea
                            isReadOnly
                            label='Objetivo'
                            variant='bordered'
                            size='lg'
                            radius='md'
                            minRows={6}
                            defaultValue={dto.goal}
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
                    <div className='mb-5 flex w-2/3'>
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
                    <div className='mb-5 flex w-2/3'>
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
                        Tramitar
                    </div>
                    <div className='mb-5 flex'>
                        <Select
                            label='Departamento destinatário*'
                            variant='bordered'
                            size='sm'
                            radius='md'
                            className='max-w-xs'
                            {...register('destiny', {
                                required: {
                                    value: true,
                                    message: 'Destinatário obrigatório!',
                                },
                            })}
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
                                    base: 'before:bg-background dark:bg-dark-background',
                                    content:
                                        'p-0 border-small border-divider bg-background dark:bg-dark-background',
                                },
                            }}
                        >
                            {unities.map(u => (
                                <SelectItem key={u.id as number} value={u.id as number} className='capitalize'>
                                    {`${u.name.toLowerCase()} - ${u.type.toString().toLocaleLowerCase()}`}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
            </ScrollShadow>
        </div>
    )
}
