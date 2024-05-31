import { EventDTO } from '@/models/event'
import { RootState } from '@/store'
import { updateFormData } from '@/store/formStore'
import { Textarea } from '@nextui-org/input'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

interface FormType {
    currentStep: number
}

export const EventForm3: React.FC<FormType> = ({ currentStep }) => {
    const {
        register,
        getValues,
        formState: { errors },
    } = useFormContext<EventDTO>()
    const dto = useSelector((state: RootState) => state.form.eventData)
    const dispatch = useDispatch()

    useEffect(() => {
        const text = getValues('goal')
        if(currentStep != 2 && text != dto.goal && text != '') {
            dispatch(updateFormData({goal: text}))
        }
    }, [dispatch, getValues, currentStep, dto])

    return (
        <div
            className='flex h-auto w-full flex-col items-center justify-center space-y-5'
        >
            <div className='flex w-full justify-center'>
                <div className='lg:w-3/4 w-full h-auto'>
                    <Textarea
                        label='Objetivo*'
                        variant='bordered'
                        placeholder='Qual o objetivo da participação no evento ?'
                        size='lg'
                        radius='md'
                        minRows={6}
                        isInvalid={errors?.goal && 'Input-error' ? true : false}
                        {...register('goal', {
                            required: {
                                value: true,
                                message: 'Objetivo obrigatório!',
                            },
                            maxLength: {
                                value: 500,
                                message: 'Tamanho máximo de 500 characteres!',
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
