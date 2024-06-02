import { EventDTO, EventPeriodicity, EventType } from '@/models/event'
import { Input } from '@nextui-org/input'
import { Select, SelectItem } from '@nextui-org/select'
import { useFormContext } from 'react-hook-form'


export const EventForm1 = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<EventDTO>()

    const eventTypes = [
        EventType.OUTROS,
        EventType.SIMPOSIO,
        EventType.CONGRESSO,
        EventType.TECNOLOGIA,
        EventType.EXPOFEIRA,
        EventType.FEIRA_LIVRE,
    ]
    const eventPeriodicities = [
        EventPeriodicity.ANUALMENTE,
        EventPeriodicity.SEMESTRALMENTE,
        EventPeriodicity.TRIMESTRALMENTE,
        EventPeriodicity.SEMANALMENTE,
    ]

    return (
        <div className='flex h-auto w-full flex-col items-center justify-center space-y-5'>
            <div className='flex w-full flex-col items-center justify-center space-y-4 lg:flex-row lg:space-x-10 lg:space-y-0'>
                <div className='w-72'>
                    <Input
                        label='Nome do Evento*'
                        size='sm'
                        variant='bordered'
                        radius='md'
                        isInvalid={errors?.name && 'Input-error' ? true : false}
                        {...register('name', {
                            required: {
                                value: true,
                                message: 'Nome obrigatório!',
                            },
                        })}
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
                </div>
                <div className='w-72'>
                    <Select
                        label='Tipo do Evento*'
                        variant='bordered'
                        size='sm'
                        radius='md'
                        className='max-w-xs'
                        {...register('type', {
                            required: {
                                value: true,
                                message: 'Tipo obrigatório!',
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
                        {eventTypes.map(t => (
                            <SelectItem key={t} value={t as EventType}>
                                {t.toString()}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className='w-72'>
                    <Select
                        label='Periodicidade do Evento*'
                        variant='bordered'
                        size='sm'
                        radius='md'
                        className='max-w-xs'
                        {...register('periodicity', {
                            required: {
                                value: true,
                                message: 'Periodicidade obrigatória!',
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
                        {eventPeriodicities.map(p => (
                            <SelectItem key={p} value={p as EventPeriodicity}>
                                {p.toString()}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
            <div className='flex w-full flex-col items-center justify-center space-y-4 lg:flex-row lg:space-x-10 lg:space-y-0'>
                <div className='w-72'>
                    <Input
                        label='Data de Início*'
                        variant='bordered'
                        size='sm'
                        type='date'
                        radius='md'
                        isInvalid={
                            errors?.startDate && 'Input-error' ? true : false
                        }
                        {...register('startDate', {
                            required: {
                                value: true,
                                message: 'Data de início obrigatória!',
                            },
                        })}
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
                </div>
                <div className='w-72'>
                    <Input
                        label='Data de Fim*'
                        variant='bordered'
                        size='sm'
                        type='date'
                        radius='md'
                        isInvalid={
                            errors?.endDate && 'Input-error' ? true : false
                        }
                        {...register('endDate', {
                            required: {
                                value: true,
                                message: 'Data de fim obrigatória!',
                            },
                        })}
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
                </div>
                <div className='w-72'>
                    <Input
                        label='N° de participantes*'
                        size='sm'
                        variant='bordered'
                        radius='md'
                        isInvalid={
                            errors?.participants && 'Input-error' ? true : false
                        }
                        {...register('participants', {
                            required: true,
                        })}
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
                </div>
            </div>
            <div className='flex w-full flex-col items-center justify-center space-y-4 lg:flex-row lg:space-x-10 lg:space-y-0'>
                <div className='w-72'>
                    <Input
                        label='Data de Ida*'
                        variant='bordered'
                        size='sm'
                        type='date'
                        radius='md'
                        isInvalid={
                            errors?.departureDate && 'Input-error'
                                ? true
                                : false
                        }
                        {...register('departureDate', {
                            required: {
                                value: true,
                                message: 'Data de fim obrigatória!',
                            },
                        })}
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
                </div>
                <div className='w-72'>
                    <Input
                        label='Data de Volta*'
                        variant='bordered'
                        size='sm'
                        type='date'
                        radius='md'
                        isInvalid={
                            errors?.backDate && 'Input-error' ? true : false
                        }
                        {...register('backDate', {
                            required: {
                                value: true,
                                message: 'Data de fim obrigatória!',
                            },
                        })}
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
                </div>
            </div>
        </div>
    )
}
