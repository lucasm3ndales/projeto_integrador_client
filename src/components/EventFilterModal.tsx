import {
    EventFilter,
    EventPeriodicity,
    EventStatus,
    EventType,
} from '@/models/event'
import {
    Button,
    Checkbox,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    useDisclosure,
} from '@nextui-org/react'
import { useState } from 'react'
interface Props {
    setFilter: (value: React.SetStateAction<EventFilter>) => void
    setFiltersApplied: (value: React.SetStateAction<boolean>) => void
    filter: EventFilter
}

export const EventFilterModal: React.FC<Props> = ({
    filter,
    setFilter,
    setFiltersApplied,
}) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
    const [filterState, setFilterState] = useState<EventFilter>(filter)
    const [isError, setIsError] = useState<boolean>(false)

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
        setFilterState({
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

    const applyFilters = () => {
        if (
            filterState.startDate &&
            filterState.startDate?.length > 0 &&
            !filterState.endDate
        ) {
            setIsError(true) 
        } else if(
            filterState.endDate &&
            filterState.endDate?.length > 0 &&
            !filterState.startDate
        ) {
            setIsError(true) 
        } else {
            setFilter(filterState)
            setIsError(false)
            setFiltersApplied(true)
            onClose()
        }
    }

    return (
        <>
            <Button
                type='button'
                size='md'
                radius='md'
                onPress={onOpen}
                className='w-2/3 bg-primary font-semibold text-background dark:bg-dark-primary dark:text-dark-background'
            >
                Filtros
            </Button>
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
                                        placeholder={filter.periodicity}
                                        onChange={e =>
                                            setFilterState(state => ({
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
                                        placeholder={filter.type}
                                        onChange={e =>
                                            setFilterState(state => ({
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
                                        placeholder={filter.status}
                                        onChange={e =>
                                            setFilterState(state => ({
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
                                        placeholder={filter.size?.toString()}
                                        onChange={e =>
                                            setFilterState(state => ({
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
                                            placeholder={filter.startDate}
                                            errorMessage='Data de início e término requeridas para busca!'
                                            isInvalid={isError}
                                            onChange={e =>
                                                setFilterState(state => ({
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
                                            placeholder={filter.endDate}
                                            errorMessage='Data de início e término requeridas para busca!'
                                            isInvalid={isError}
                                            onChange={e =>
                                                setFilterState(state => ({
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
                                        isSelected={filterState.archived}
                                        onChange={e =>
                                            setFilterState(state => ({
                                                ...state,
                                                archived: e.target.checked,
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
                                        //onClose()
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
        </>
    )
}
