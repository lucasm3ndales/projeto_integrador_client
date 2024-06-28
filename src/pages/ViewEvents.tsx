import {
    Event,
    EventFilter,
    EventPeriodicity,
    EventStatus,
    EventType,
} from '@/models/event'
import { Role } from '@/models/user'
import { getEvents } from '@/services/eventService'
import { RootState } from '@/store'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import {
    Checkbox,
    Chip,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Pagination,
    Select,
    SelectItem,
    useDisclosure,
} from '@nextui-org/react'
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/table'
import { Link } from '@tanstack/react-router'
import { AxiosError, AxiosResponse } from 'axios'
import { Square, SquareCheck } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

interface Pageable {
    page: number
    sort: string
    size: number
    totalPages: number
}
//TODO: Arrumar Filtros
export function ViewEvents() {
    const user = useSelector((state: RootState) => state.user.user)
    const [events, setEvents] = useState<Event[]>([])
    const [search, setSearch] = useState<string>('')
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [filtersApplied, setFiltersApplied] = useState<boolean>(false)
    const [pageable, setPageable] = useState<Pageable>({
        page: 0,
        sort: '',
        size: 10,
        totalPages: 0,
    })
    const columnsEvents = [
        { key: 'name', label: 'NOME' },
        { key: 'type', label: 'TIPO' },
        { key: 'periodicity', label: 'PERIODICIDADE' },
        { key: 'startDate', label: 'DATA DE INÍCIO' },
        { key: 'endDate', label: 'DATA DE TÉRMINO' },
        { key: 'archived', label: 'ARQUIVADO' },
        { key: 'status', label: 'STATUS' },
        { key: 'procedure', label: 'TRÂMITE' },
    ]
    const [filter, setFilter] = useState<EventFilter>({
        sort: '',
        page: 0,
        size: 10,
        name: '',
        periodicity: '',
        status: '',
        type: '',
        startDate: '',
        endDate: '',
        archived: false,
    })

    const renderTableStyle = useCallback((event, columnKey) => {
        const cellValue = event[columnKey]

        switch (columnKey) {
            case 'archived':
                if (event.archived) {
                    return (
                        <SquareCheck className='h-7 w-7 text-secondary dark:text-dark-secondary' />
                    )
                } else {
                    return (
                        <Square className='h-7 w-7 text-secondary dark:text-dark-secondary' />
                    )
                }
                break
            case 'status':
                if (event.status === EventStatus.ACEITO) {
                    return (
                        <Chip
                            size='md'
                            radius='md'
                            variant='flat'
                            classNames={{
                                content:
                                    'font-semibold text-md text-background bg-success rounded-md px-2 py-1',
                                base: 'bg-transparent',
                            }}
                        >
                            Aceito
                        </Chip>
                    )
                } else if (event.status === EventStatus.PENDENTE) {
                    return (
                        <Chip
                            size='md'
                            radius='md'
                            variant='flat'
                            classNames={{
                                content:
                                    'font-semibold text-md text-background dark:text-dark-background bg-primary dark:bg-dark-primary rounded-md px-2 py-1',
                                base: 'bg-transparent',
                            }}
                        >
                            Pendente
                        </Chip>
                    )
                } else {
                    return (
                        <Chip
                            size='md'
                            radius='md'
                            variant='flat'
                            classNames={{
                                content:
                                    'font-semibold text-md text-background bg-error rounded-md px-2 py-1',
                                base: 'bg-transparent',
                            }}
                        >
                            Recusado
                        </Chip>
                    )
                }
                break
            case 'procedure':
                if (user?.role === Role.PRO_REITOR) {
                    return (
                        <Link
                            to={'/details-rec/$eventId'}
                            params={{ eventId: event.id }}
                        >
                            <Button
                                size='md'
                                className='bg-secondary font-semibold text-background dark:bg-dark-secondary dark:text-dark-background'
                            >
                                Detalhes
                            </Button>
                        </Link>
                    )
                } else if (user?.role === Role.CHEFE_DEPARTAMENTO) {
                    return (
                        <Link
                            to={'/details-dep/$eventId'}
                            params={{ eventId: event.id }}
                        >
                            <Button
                                size='md'
                                className='bg-secondary font-semibold text-background dark:bg-dark-secondary dark:text-dark-background'
                            >
                                Detalhes
                            </Button>
                        </Link>
                    )
                } else {
                    return (
                        <Link
                            to={'/details-serv/$eventId'}
                            params={{ eventId: event.id }}
                        >
                            <Button
                                size='md'
                                className='bg-secondary font-semibold text-background dark:bg-dark-secondary dark:text-dark-background'
                            >
                                Detalhes
                            </Button>
                        </Link>
                    )
                }
                break
            default:
                return cellValue
                break
        }
    }, [])

    const handleEvents = useCallback(() => {
        if (user) {
            getEvents(user.id, filter)
                .then((res: AxiosResponse<Event[] | any>) => {
                    setEvents(res.data.content)
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
                            'Eventos não encontrados!',
                        {
                            className:
                                'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                            duration: 3000,
                        },
                    )
                })
        }
    }, [user, filter])

    useEffect(() => {
        handleEvents()
    }, [handleEvents])

    useEffect(() => {
        const handler = setTimeout(() => {
            if (search.trim() !== filter.name) {
                setFilter(state => ({
                    ...state,
                    name: search.trim(),
                }))
                setFiltersApplied(true)
            }
        }, 600)

        return () => clearTimeout(handler)
    }, [search, filter.name, handleEvents])

    useEffect(() => {
        if (filtersApplied) {
            handleEvents()
            setFiltersApplied(false)
        }
    }, [filtersApplied, handleEvents])

    useEffect(() => {
        if (pageable.page != filter.page) {
            setFilter(state => ({
                ...state,
                page: pageable.page,
            }))
            setFiltersApplied(true)
        }
    }, [pageable.page, filter.page, handleEvents])

    const applyFilters = () => {
        setFiltersApplied(true)
    }

    const cleanFilters = () => {
        setFilter({
            sort: '',
            size: 10,
            name: '',
            periodicity: '',
            status: '',
            startDate: '',
            endDate: '',
            archived: false,
        })
        setFiltersApplied(true)
    }

    return (
        <main className='flex w-full justify-center lg:ms-12'>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop='blur'
                radius='md'
                classNames={{
                    body: 'py-6',
                    backdrop:
                        'bg-tertiary/50 dark:bg-dark-tertiary/50 backdrop-opacity-90',
                    base: 'border border-tertiary dark:border-dark-tertiary bg-background dark:bg-dark-background text-secondary dark:text-dark-secondary',
                    header: 'border-b-[1px] border-tertiary dark:border-dark-tertiary',
                    footer: 'border-t-[1px] border-tertiary dark:border-dark-tertiary',
                    closeButton:
                        'hover:bg-white/5 active:bg-white/10 text-secondary dark:text-dark-secondary text-lg',
                }}
            >
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                Filtros
                            </ModalHeader>
                            <ModalBody>
                                <div className='flex flex-col items-center space-y-4'>
                                    <Select
                                        label='Periodicidade'
                                        variant='bordered'
                                        size='sm'
                                        radius='md'
                                        value={filter.periodicity}
                                        onChange={e =>
                                            setFilter(state => ({
                                                ...state,
                                                periodicity: e.target.value,
                                            }))
                                        }
                                        className='max-w-xs'
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
                                        {Object.values(EventPeriodicity).map(
                                            p => (
                                                <SelectItem key={p} value={p}>
                                                    {p}
                                                </SelectItem>
                                            ),
                                        )}
                                    </Select>
                                    <Select
                                        label='Tipo'
                                        variant='bordered'
                                        size='sm'
                                        radius='md'
                                        className='max-w-xs'
                                        value={filter.type}
                                        onChange={e =>
                                            setFilter(state => ({
                                                ...state,
                                                type: e.target.value,
                                            }))
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
                                        {Object.values(EventType).map(t => (
                                            <SelectItem key={t} value={t}>
                                                {t}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <Select
                                        label='Status'
                                        variant='bordered'
                                        size='sm'
                                        radius='md'
                                        className='max-w-xs'
                                        value={filter.status}
                                        onChange={e =>
                                            setFilter(state => ({
                                                ...state,
                                                status: e.target.value,
                                            }))
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
                                        {Object.values(EventStatus).map(s => (
                                            <SelectItem key={s} value={s}>
                                                {s}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <Select
                                        label='Items por Página'
                                        variant='bordered'
                                        size='sm'
                                        radius='md'
                                        className='max-w-xs'
                                        value={filter.size}
                                        onChange={e =>
                                            setFilter(state => ({
                                                ...state,
                                                size: Number(e.target.value),
                                            }))
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
                                        {[10, 25, 50, 100].map(i => (
                                            <SelectItem key={i} value={i}>
                                                {i.toString()}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <div className='w-80'>
                                        <Input
                                            size='sm'
                                            radius='md'
                                            label='Data de Início'
                                            type='date'
                                            value={filter.startDate}
                                            onChange={e =>
                                                setFilter(state => ({
                                                    ...state,
                                                    startDate: e.target.value,
                                                }))
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
                                    <div className='w-80'>
                                        <Input
                                            size='sm'
                                            radius='md'
                                            label='Data de Término'
                                            aria-placeholder='dd/mm/yyyy'
                                            type='date'
                                            value={filter.endDate}
                                            onChange={e =>
                                                setFilter(state => ({
                                                    ...state,
                                                    endDate: e.target.value,
                                                }))
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
                                    <Checkbox
                                        size='lg'
                                        radius='md'
                                        isSelected={filter.archived}
                                        onValueChange={() =>
                                            setFilter(state => ({
                                                ...state,
                                                archived: !filter.archived,
                                            }))
                                        }
                                        color='success'
                                        classNames={{
                                            icon: [
                                                'text-background dark:text-dark-background',
                                            ],
                                        }}
                                    >
                                        Arquivado
                                    </Checkbox>
                                </div>
                            </ModalBody>
                            <ModalFooter className='flex justify-center'>
                                <Button
                                    type='button'
                                    size='md'
                                    radius='md'
                                    onClick={() => {
                                        cleanFilters()
                                        onClose()
                                    }}
                                    className='w-2/3 bg-error font-semibold text-background '
                                >
                                    Limpar Filtros
                                </Button>
                                <Button
                                    type='button'
                                    size='md'
                                    radius='md'
                                    onPress={() => {
                                        applyFilters()
                                        onClose()
                                    }}
                                    className='w-2/3 bg-success font-semibold text-background'
                                >
                                    Aplicar Filtros
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

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
                    <Button
                        type='button'
                        size='md'
                        radius='md'
                        onPress={onOpen}
                        className='w-2/3 bg-primary font-semibold text-background dark:bg-dark-primary dark:text-dark-background'
                    >
                        Filtros
                    </Button>
                </div>
                <div className='mt-8 flex h-auto w-full flex-col items-center space-y-3 rounded-md border border-tertiary px-2 py-4 shadow-lg dark:border-dark-tertiary'>
                    <Table
                        aria-label='Eventos'
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
                        <TableHeader columns={columnsEvents}>
                            {column => (
                                <TableColumn key={column.key}>
                                    {column.label}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody
                            items={events}
                            emptyContent={'Nenhum Evento Encontrado!'}
                        >
                            {event => (
                                <TableRow key={event.id}>
                                    {columnKey => (
                                        <TableCell className='capitalize'>
                                            {renderTableStyle(event, columnKey)}
                                        </TableCell>
                                    )}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                {events && events.length > 0 && (
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
