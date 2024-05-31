import { EventDTO } from '@/models/event'
import { Input } from '@nextui-org/input'
import { useFormContext } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { updateFormData } from '@/store/formStore'
import { useEffect } from 'react'
import { AddressDTO } from '@/models/address'

interface FormType {
    currentStep: number
}

export const EventForm2: React.FC<FormType> = ({ currentStep }) => {
    const {
        register,
        getValues,
        formState: { errors },
    } = useFormContext<EventDTO>()
    const dto = useSelector((state: RootState) => state.form.eventData)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!dto.address && currentStep === 1) {
            dispatch(updateFormData({ address: {
                country: '',
                state: '',
                city: '',
                district: '',
                street: '',
                num: '',
                complement: ''
            } }))
        }
    }, [dto.address, dispatch])

    useEffect(() => {
        
        function verifyAddressValues() {

        }

        const coutry = getValues('address.country')
        const state = getValues('address.state')
        const city = getValues('address.city')
        const district = getValues('address.district')
        const street = getValues('address.street')
        const num = getValues('address.num')
        const complement = getValues('address.complement')
        if (
            currentStep != 1 ) {
            dispatch(updateFormData({ address: {
                country: coutry,
                state: state,
                city: city,
                district: district,
                street: street,
                num: num,
                complement: complement
            } }))
        }
    }, [dispatch, getValues, currentStep, dto])

    return (
        <div className='flex h-auto w-full flex-col items-center justify-center space-y-5'>
            <div className='flex w-full flex-col items-center justify-center space-y-4 lg:flex-row lg:space-x-10 lg:space-y-0'>
                <div className='w-72'>
                    <Input
                        label='País*'
                        size='sm'
                        variant='bordered'
                        radius='md'
                        isInvalid={
                            errors?.address?.country && 'Input-error'
                                ? true
                                : false
                        }
                        {...register('address.country', {
                            required: {
                                value: true,
                                message: 'País obrigatório!',
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
                        label='Estado/Provìncia*'
                        size='sm'
                        variant='bordered'
                        radius='md'
                        isInvalid={
                            errors?.address?.state && 'Input-error'
                                ? true
                                : false
                        }
                        {...register('address.state', {
                            required: {
                                value: true,
                                message: 'Estado/Província obrigatório!',
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
                        label='Cidade*'
                        size='sm'
                        variant='bordered'
                        radius='md'
                        isInvalid={
                            errors?.address?.city && 'Input-error'
                                ? true
                                : false
                        }
                        {...register('address.city', {
                            required: {
                                value: true,
                                message: 'Cidade obrigatória!',
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
            <div className='flex w-full flex-col items-center justify-center space-y-4 lg:flex-row lg:space-x-10 lg:space-y-0'>
                <div className='w-72'>
                    <Input
                        label='Bairro*'
                        variant='bordered'
                        size='sm'
                        radius='md'
                        isInvalid={
                            errors?.address?.district && 'Input-error'
                                ? true
                                : false
                        }
                        {...register('address.district', {
                            required: {
                                value: true,
                                message: 'Bairro obrigatório!',
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
                        label='Rua*'
                        variant='bordered'
                        size='sm'
                        radius='md'
                        isInvalid={
                            errors?.address?.street && 'Input-error'
                                ? true
                                : false
                        }
                        {...register('address.street', {
                            required: {
                                value: true,
                                message: 'Rua obrigatório!',
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
                        label='Número'
                        size='sm'
                        variant='bordered'
                        radius='md'
                        isInvalid={
                            errors?.address?.num && 'Input-error' ? true : false
                        }
                        {...register('address.num')}
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
            <div className='flex w-72 flex-col items-center justify-center space-y-4 lg:w-1/2 lg:flex-row lg:space-x-10 lg:space-y-0'>
                <div className='w-full'>
                    <Input
                        label='Complemento'
                        variant='bordered'
                        size='sm'
                        radius='md'
                        isInvalid={
                            errors?.address?.complement && 'Input-error'
                                ? true
                                : false
                        }
                        {...register('address.complement')}
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
