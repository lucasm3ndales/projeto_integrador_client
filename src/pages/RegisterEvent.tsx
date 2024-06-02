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
import { updateFormData } from '@/store/formStore'
import { Button } from '@nextui-org/button'
import { AxiosError, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

export function RegisterEvent() {
    const [currentStep, setcurrentStep] = useState<number>(0)
    const methods = useForm<EventDTO>()
    const dto = useSelector((state: RootState) => state.form.eventData)
    const dispatch = useDispatch()
    const [isUpdated, setIsUpdated] = useState<boolean>(false)

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

    useEffect(() => {
        if (isUpdated) {
            setcurrentStep(currentStep + 1)
            setIsUpdated(false)
        }
    }, [dto, isUpdated, currentStep])

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

    const handleNextStep = () => {
        const values = methods.getValues()
        dispatch(updateFormData(values))
        setIsUpdated(true)
    }

    const handleBackStep = () => {
        setcurrentStep(currentStep - 1)
    }

    const handleSaveEvent = () => {
        saveEvent(dto)
            .then((res: AxiosResponse<string>) => {
                toast.error(res?.data, {
                    className:
                        'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                    duration: 3000,
                })
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

    return (
        <main className='flex w-full justify-center lg:ms-12 lg:mt-14'>
            <div className='w-full rounded-md border border-tertiary bg-background px-4 py-6 dark:border-dark-tertiary dark:bg-dark-background lg:w-2/3'>
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
                            <div className='flex'>
                                <Button
                                    type='submit'
                                    size='lg'
                                    radius='md'
                                    className='mt-8 w-56 bg-success font-semibold text-background'
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
