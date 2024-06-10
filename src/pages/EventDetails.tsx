import { Event } from '@/models/event'
import { EventExpense, Expense } from '@/models/expense'
import { getEvent } from '@/services/eventService'
import { getExpenses } from '@/services/expenseService'
import { Input, Textarea } from '@nextui-org/input'
import { Accordion, AccordionItem, Button } from '@nextui-org/react'
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
import { Link, useParams } from '@tanstack/react-router'
import { AxiosError, AxiosResponse } from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { format } from 'date-fns'

interface ExpeseItems extends Expense, EventExpense {}

export const EventDetails = () => {
    const { eventId } = useParams({ strict: false })
    const [event, setEvent] = useState<Event | null>(null)
    const [expenses, setExpenses] = useState<Expense[]>([])
    const columnsDocument = [
        { key: 'name', label: 'Nome' },
        { key: 'type', label: 'Tipo' },
        { key: 'download', label: 'Download' },
    ]
    const columnsExpenses = [
        { key: 'name', label: 'Nome' },
        { key: 'type', label: 'Tipo' },
        { key: 'value', label: 'Valor' },
    ]

    const documents = useMemo(() => {
        if (event && event.procedures.length > 0) {
            return event.procedures.flatMap(p => p.documents)
        }
        return []
    }, [event])

    const total = useMemo(() => {
        if (event) {
            return formatToBRL(event.cost)
        }
    }, [event])

    const startDate = useMemo(() => {
        if (event) {
            return format(new Date(event.startDate), 'dd/MM/yyyy')
        }
    }, [event])

    const endDate = useMemo(() => {
        if (event) {
            return format(new Date(event.endDate), 'dd/MM/yyyy')
        }
    }, [event])

    const departureDate = useMemo(() => {
        if (event) {
            return format(new Date(event.departureDate), 'dd/MM/yyyy')
        }
    }, [event])

    const backDate = useMemo(() => {
        if (event) {
            return format(new Date(event.backDate), 'dd/MM/yyyy')
        }
    }, [event])
    
    console.log(event)

    const expenseItems = useMemo(() => {
        if (
            event &&
            event?.eventExpenses &&
            event.eventExpenses.length > 0 &&
            expenses.length > 0
        ) {
            console.log(expenses)

            const items: ExpeseItems[] = event.eventExpenses
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
            return items
        }
    }, [event, expenses])

    const renderDocumentTable = useCallback((document, columnKey) => {
        const cellValue = document[columnKey]

        switch (columnKey) {
            case 'download':
                return (
                    <Button
                        onClick={download(document.id)}
                        className='bg-primary font-semibold text-secondary dark:bg-dark-primary dark:text-dark-secondary'
                    >
                        Download
                    </Button>
                )
                break
            default:
                return cellValue
                break
        }
    }, [])

    useEffect(() => {
        if (eventId && !event) {
            getEvent(eventId)
                .then((res: AxiosResponse<Event>) => {
                    setEvent(res.data)
                })
                .catch((err: AxiosError) => {
                    toast.error(
                        (err?.response?.data as string) ||
                            'Evento não econtrado!',
                        {
                            className:
                                'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                            duration: 3000,
                        },
                    )
                })
        }
    }, [event, eventId])

    useEffect(() => {
        if (event && expenses.length === 0) {
            getExpenses({})
                .then((res: AxiosResponse<Expense[]>) => {
                    setExpenses(res.data.content)
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
        }
    }, [expenses, event])

    function formatToBRL(value: number): string {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value)
    }

    const download = (id: number) => {
        console.log('DOWNLOAD: ' + id)
    }

    return (
        <div className='m-1 flex flex-col items-center justify-center lg:ms-24'>
            <div className='mt-12 flex h-auto w-full flex-col space-y-8 rounded-md border border-tertiary bg-background px-2 py-4 dark:border-dark-tertiary dark:bg-dark-background lg:w-2/3'>
                <div className='flex'>
                    <Link to='/event'>
                        <Button
                            size='md'
                            className='bg-secondary font-semibold text-background dark:bg-dark-secondary dark:text-dark-background'
                        >
                            Voltar
                        </Button>
                    </Link>
                </div>
                <div className='flex'>
                    <Accordion
                        variant='splitted'
                        itemClasses={{
                            base: 'px-2 py-4 w-full border border-tertiary dark:border-dark-tertiary',
                            title: 'font-semibold text-lg text-secondary dark:text-dark-secondary bg-background dark:bg-dark-background',
                            trigger:
                                'px-2 mb-2 rounded-md h-12 w-full flex items-center bg-background dark:bg-dark-background',
                            indicator:
                                'text-lg text-secondary dark:text-dark-secondary',
                            content: 'px-2 py-1',
                        }}
                    >
                        <AccordionItem key={1} title='Sobre o Evento'>
                            <div className='mb-5 flex space-x-5'>
                                <div className='w-72'>
                                    <Input
                                        isReadOnly
                                        label='Nome do Evento'
                                        size='sm'
                                        variant='bordered'
                                        radius='md'
                                        value={event ? event.name : '--'}
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
                                        value={event ? event.type : '--'}
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
                                        value={event ? event.periodicity : '--'}
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
                                        value={
                                            event
                                                ? String(event.participants)
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
                            <div className='mb-5 flex space-x-5'>
                                <div className='w-72'>
                                    <Input
                                        isReadOnly
                                        label='Data de início'
                                        size='sm'
                                        variant='bordered'
                                        radius='md'
                                        value={startDate ? startDate : '--'}
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
                                        value={endDate ? endDate : '--'}
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
                                        value={
                                            departureDate ? departureDate : '--'
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
                                <div className='w-72'>
                                    <Input
                                        isReadOnly
                                        label='Data de volta'
                                        size='sm'
                                        variant='bordered'
                                        radius='md'
                                        value={backDate ? backDate : '--'}
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
                        </AccordionItem>
                        <AccordionItem key={2} title='Endereço do Evento'>
                            <div className='mb-5 flex space-x-5'>
                                <div className='w-72'>
                                    <Input
                                        isReadOnly
                                        label='País'
                                        size='sm'
                                        variant='bordered'
                                        radius='md'
                                        value={
                                            event ? event.address.country : '--'
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
                                <div className='w-72'>
                                    <Input
                                        isReadOnly
                                        label='Estado/Província'
                                        size='sm'
                                        variant='bordered'
                                        radius='md'
                                        value={
                                            event ? event.address.state : '--'
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
                                <div className='w-72'>
                                    <Input
                                        isReadOnly
                                        label='Cidade'
                                        size='sm'
                                        variant='bordered'
                                        radius='md'
                                        value={
                                            event ? event.address.city : '--'
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
                                <div className='w-72'>
                                    <Input
                                        isReadOnly
                                        label='Bairro'
                                        size='sm'
                                        variant='bordered'
                                        radius='md'
                                        value={
                                            event
                                                ? event.address.district
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
                            <div className='mb-5 flex space-x-5'>
                                <div className='w-72'>
                                    <Input
                                        isReadOnly
                                        label='Rua'
                                        size='sm'
                                        variant='bordered'
                                        radius='md'
                                        value={
                                            event ? event.address.street : '--'
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
                                <div className='w-72'>
                                    <Input
                                        isReadOnly
                                        label='Número'
                                        size='sm'
                                        variant='bordered'
                                        radius='md'
                                        value={event ? event.address.num : '--'}
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
                                        value={
                                            event
                                                ? event.address.complement
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
                        </AccordionItem>
                        <AccordionItem key={3} title='Objetivo'>
                            <div className='mb-5 flex w-2/3'>
                                <Textarea
                                    isReadOnly
                                    label='Objetivo'
                                    variant='bordered'
                                    size='lg'
                                    radius='md'
                                    minRows={6}
                                    value={event ? event.goal : ''}
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
                        </AccordionItem>
                        <AccordionItem key={4} title='Documentos'>
                            <div className='mb-5 flex w-2/3'>
                                <Table
                                    aria-label='Documentos'
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
                                        items={documents}
                                        emptyContent={
                                            'Nenhum Documento Encontrado!'
                                        }
                                    >
                                        {item => (
                                            <TableRow key={item.name}>
                                                {columnKey => (
                                                    <TableCell className='capitalize'>
                                                        {renderDocumentTable(
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
                        </AccordionItem>
                        <AccordionItem key={5} title='Despesas'>
                            <div className='mb-5 flex w-full items-center justify-between'>
                                <div className='flex w-2/3'>
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
                                        <TableHeader columns={columnsExpenses}>
                                            {column => (
                                                <TableColumn key={column.key}>
                                                    {column.label}
                                                </TableColumn>
                                            )}
                                        </TableHeader>
                                        <TableBody
                                            items={
                                                expenseItems ? expenseItems : []
                                            }
                                            emptyContent={
                                                'Nenhuma Despesa Encontrada!'
                                            }
                                        >
                                            {item => (
                                                <TableRow key={item.id}>
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
                                <div className='ms-4 flex h-20 min-h-20 w-1/4 items-center justify-center rounded-md border border-tertiary bg-transparent p-2 text-xl font-semibold text-primary dark:border-dark-tertiary dark:text-dark-primary'>
                                    Custo Total: {total}
                                </div>
                            </div>
                        </AccordionItem>
                        <AccordionItem key={6} title='Trâmite'>
                            fdsafsdafasdfa
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}
