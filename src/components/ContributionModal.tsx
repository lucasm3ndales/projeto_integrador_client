import { ContributionDTO } from '@/models/event'
import { contributeToEvent } from '@/services/eventService'
import { Button } from '@nextui-org/button'
import {
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react'
import { AxiosError, AxiosResponse } from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
    userId: number
    eventId: number
}

export const ContributionModal: React.FC<Props> = ({ userId, eventId }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [contributionDTO, setContributionDTO] = useState<ContributionDTO>({
        userId: userId,
        eventId: eventId,
        contribution: 0.0,
    })

    const send = () => {
        contributeToEvent(contributionDTO)
            .then((res: AxiosResponse) => {
                toast.success(res.data as string, {
                    className:
                        'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                    duration: 3000,
                })
                window.location.reload()
            })
            .catch((err: AxiosError) => {
                toast.error(
                    (err?.response?.data as string) ||
                        'Erro ao aportar valor ao evento!',
                    {
                        className:
                            'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                        duration: 3000,
                    },
                )
            })
    }

    return (
        <>
            <Button
                onPress={onOpen}
                type='button'
                size='lg'
                radius='md'
                className='me-4 w-56 bg-primary font-semibold text-background dark:bg-dark-primary dark:text-dark-background'
            >
                Aportar Valor
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
                                Aportar Valor ao Evento
                            </ModalHeader>
                            <ModalBody>
                                <div className='flex w-full justify-center'>
                                    <Input
                                        label='Valor do aporte'
                                        size='sm'
                                        variant='bordered'
                                        radius='md'
                                        type='number'
                                        value={contributionDTO.contribution as string}
                                        onChange={e =>
                                            setContributionDTO(state => ({
                                                ...state,
                                                contribution: e.target.value,
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
                            </ModalBody>
                            <ModalFooter className='flex justify-center'>
                                <Button
                                    type='button'
                                    size='md'
                                    radius='md'
                                    onClick={() => {
                                        onClose()
                                    }}
                                    className='w-2/3 bg-error font-semibold text-background '
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type='button'
                                    size='md'
                                    radius='md'
                                    onPress={() => {
                                        send()
                                        onClose()
                                    }}
                                    className='w-2/3 bg-success font-semibold text-background'
                                >
                                    Aportar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
