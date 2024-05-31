import { EventForm1 } from '@/components/EventForm1'
import { EventForm2 } from '@/components/EventForm2'
import { EventForm3 } from '@/components/EventForm3'
import { EventForm4 } from '@/components/EventForm4'
import { EventForm5 } from '@/components/EventForm5'
import { EventForm6 } from '@/components/EventForm6'
import { Stepper } from '@/components/Stepper'
import { StepperContent } from '@/components/StepperContent'
import { EventDTO } from '@/models/event'
import { updateFormData } from '@/store/formStore'
import { Button } from '@nextui-org/button'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

export function RegisterEvent() {
    const [currentStep, setcurrentStep] = useState<number>(0)
    const methods = useForm<EventDTO>()
    const dispatch = useDispatch()

    const steps = [
        'Dados do Evento',
        'Endereço do Evento',
        'Objetivo',
        'Documentos',
        'Despesas',
        'Tramitar',
    ]

    const stepContent = [
        <EventForm1 currentStep={currentStep}/>,
        <EventForm2 currentStep={currentStep}/>,
        <EventForm3 currentStep={currentStep}/>,
        <EventForm4 />,
        <EventForm5 currentStep={currentStep} />,
        <EventForm6 currentStep={currentStep} />,
    ]

    const step = (n: number) => {
        if (n >= 0 && n < steps.length) {
            setcurrentStep(n)
        }
    }

    const saveEvent = (dto: EventDTO) => {
        dispatch(updateFormData(dto))
        if (currentStep === 5) {
            console.log('FINALIZOU')
            console.log(dto)
        }
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
                        onSubmit={methods.handleSubmit(saveEvent)}
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
                <div className='mt-3 flex justify-between'>
                    <Button
                        type='button'
                        size='lg'
                        radius='md'
                        isDisabled={currentStep === 0}
                        className='w-auto bg-secondary font-semibold text-background dark:bg-dark-secondary dark:text-dark-background'
                        onClick={() => step(currentStep - 1)}
                    >
                        Voltar
                    </Button>
                    <Button
                        type='button'
                        size='lg'
                        radius='md'
                        isDisabled={currentStep === 5}
                        className='w-auto bg-primary font-semibold text-background dark:bg-dark-primary dark:text-dark-background'
                        onClick={() => step(currentStep + 1)}
                    >
                        Avançar
                    </Button>
                </div>
            </div>
        </main>
    )
}
