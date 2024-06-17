import { EventForm1 } from '@/components/EventForm1'
import { EventForm2 } from '@/components/EventForm2'
import { EventForm3 } from '@/components/EventForm3'
import { EventForm4 } from '@/components/EventForm4'
import { EventForm5 } from '@/components/EventForm5'
import { EventForm6 } from '@/components/EventForm6'
import { Stepper } from '@/components/Stepper'
import { StepperContent } from '@/components/StepperContent'
import { EventDTO } from '@/models/event'
import { saveEvent } from '@/services/eventService'
import { RootState } from '@/store'
import { clearFormData, updateFormData } from '@/store/formStore'
import { Button } from '@nextui-org/button'
import { AxiosError, AxiosResponse } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { debounce } from 'lodash'
import { Select, SelectItem } from '@nextui-org/select'
import { Unity, UnityFilter, UnityType } from '@/models/unity'
import { getUnities } from '@/services/unityService'

export function RegisterEvent() {
    const [currentStep, setcurrentStep] = useState<number>(0)
    const methods = useForm<EventDTO>()
    const dto = useSelector((state: RootState) => state.form.eventData)
    const dispatch = useDispatch()
    const [unities, setUnities] = useState<Unity[]>([])

    const steps = [
        'Dados do Evento',
        'Endereço do Evento',
        'Objetivo',
        'Documentos',
        'Despesas',
        'Tramitar',
    ]

    const stepContent = [
        <EventForm1 />,
        <EventForm2 />,
        <EventForm3 />,
        <EventForm4 />,
        <EventForm5 currentStep={currentStep} />,
        <EventForm6 currentStep={currentStep} />,
    ]

    const updateDTO = useCallback(
        debounce(() => {
            const formValues = methods.getValues()
            dispatch(updateFormData(formValues))
        }, 500),
        [methods, dispatch, debounce],
    )

    useEffect(() => {
        const subscription = methods.watch(() => {
            updateDTO()
        })
        return () => subscription.unsubscribe()
    }, [methods, updateDTO])

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
            methods.formState.isSubmitted &&
            Object.keys(methods.formState.errors).length > 0
        ) {
            const err = methods.formState.errors
            if (
                err.name ||
                err.type ||
                err.periodicity ||
                err.participants ||
                err.startDate ||
                err.endDate ||
                err.departureDate ||
                err.backDate
            ) {
                toast.error('Formulário inválido! Passo 1', {
                    className:
                        'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                    duration: 3000,
                    description:
                        'Por favor, verifique os campos obrigatórios do formulário.',
                })
            }

            if (err.address) {
                toast.error('Formulário inválido! Passo 2', {
                    className:
                        'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                    duration: 3000,
                    description:
                        'Por favor, verifique os campos obrigatórios do formulário.',
                })
            }

            if (err.goal) {
                toast.error('Formulário inválido! Passo 3', {
                    className:
                        'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                    duration: 3000,
                    description:
                        'Por favor, verifique os campos obrigatórios do formulário.',
                })
            }
        }
    }, [methods.formState.isSubmitted, methods.formState.errors])

    const handleSaveEvent = () => {
        saveEvent(dto)
            .then((res: AxiosResponse<string>) => {
                toast.error(res?.data, {
                    className:
                        'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                    duration: 3000,
                })
                dispatch(clearFormData())
                window.location.reload()
            })
            .catch((err: AxiosError) => {
                toast.error(
                    (err.response?.data as string) ||
                        'Erro interno do servidor!',
                    {
                        className:
                            'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                        duration: 3000,
                    },
                )
            })
    }

    const handleNextStep = () => {
        setcurrentStep(currentStep + 1)
    }

    const handleBackStep = () => {
        setcurrentStep(currentStep - 1)
    }

    return (
        <main className='flex w-full justify-center lg:ms-12 lg:mt-14'>
            <div className='w-full rounded-md border border-tertiary bg-background px-4 py-6 dark:border-dark-tertiary dark:bg-dark-background lg:w-3/4'>
                <div className='flex flex-col lg:flex-row'>
                    <div className='flex w-1/3 flex-col text-nowrap font-semibold'>
                        <h1 className='text-2xl text-secondary dark:text-dark-secondary'>
                            Novo Evento
                        </h1>
                        <p className='text-xs text-primary dark:text-dark-primary'>
                            Campos Obrigatórios*
                        </p>
                    </div>
                    <div className='mt-5 flex w-full flex-col lg:mt-0'>
                        <Stepper stepsArr={steps} current={currentStep} />
                    </div>
                </div>
                <FormProvider {...methods}>
                    <form
                        method='POST'
                        onSubmit={methods.handleSubmit(handleSaveEvent)}
                        className='mt-8 flex h-auto w-auto flex-col items-center'
                    >
                        <StepperContent
                            content={stepContent}
                            current={currentStep}
                        />
                        {currentStep === 5 && (
                            <div className='flex lg:flex-row flex-col mt-5 w-full items-center justify-center space-y-6 lg:space-y-0 space-x-0 lg:space-x-5'>
                                <Select
                                    label='Departamento destinatário*'
                                    variant='bordered'
                                    size='sm'
                                    description='Escolha o destinatário para o trâmite.'
                                    radius='md'
                                    className='max-w-xs'
                                    {...methods.register('destiny', {
                                        required: {
                                            value: true,
                                            message:
                                                'Destinatário obrigatório!',
                                        },
                                        setValueAs: value => Number(value),
                                    })}
                                    classNames={{
                                        label: 'text-secondary dark:text-dark-secondary',
                                        trigger:
                                            'bg-transaparent border border-tertiary dark:border-dark-tertiary hover:border-primary dark:hover:border-dark-primary',
                                        listboxWrapper: 'max-h-[400px]',
                                        errorMessage: 'text-error',
                                        description: 'text-secondary dark:text-dark-secondary',
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
                                    {unities.map(u => (
                                        <SelectItem
                                            key={u.id as number}
                                            value={u.id as number}
                                            className='capitalize'
                                        >
                                            {`${u.name.toLowerCase()} - ${u.type.toString().toLocaleLowerCase()}`}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Button
                                    type='submit'
                                    size='lg'
                                    radius='md'
                                    className='w-56 h-20 bg-success font-semibold text-background'
                                >
                                    Enviar
                                </Button>
                            </div>
                        )}
                    </form>
                </FormProvider>
                <div className='mt-3 flex h-auto w-full justify-between'>
                    <Button
                        type='button'
                        size='lg'
                        radius='md'
                        isDisabled={currentStep === 0}
                        className='w-auto bg-secondary font-semibold text-background dark:bg-dark-secondary dark:text-dark-background'
                        onClick={handleBackStep}
                    >
                        Voltar
                    </Button>
                    <Button
                        type='button'
                        size='lg'
                        radius='md'
                        isDisabled={currentStep === 5}
                        className='w-auto bg-primary font-semibold text-background dark:bg-dark-primary dark:text-dark-background'
                        onClick={handleNextStep}
                    >
                        Avançar
                    </Button>
                </div>
            </div>
        </main>
    )
}
