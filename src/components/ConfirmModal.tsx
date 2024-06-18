import { EventStatus, EventStatusDTO } from '@/models/event'
import { changeEventStatus } from '@/services/eventService'
import { Button } from '@nextui-org/button'
import {
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
    status: EventStatus
}

const acceptStyle = 'me-4 w-56 bg-success font-semibold text-background'
const declineStyle = 'me-4 w-56 bg-error font-semibold text-background'

export const ConfirmModal: React.FC<Props> = ({ userId, eventId, status }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [statusDTO] = useState<EventStatusDTO>({
        userId: userId,
        eventId: eventId,
        status: status,
    })

    const send = () => {
        changeEventStatus(statusDTO)
            .then((res: AxiosResponse) => {
                toast.success(res.data as string, {
                    className:
                        'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                    duration: 3000,
                })
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
                className={status === EventStatus.ACEITO ? acceptStyle : declineStyle}
            >
                {status === EventStatus.ACEITO ? 'Aceitar' : 'Recusar'}
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
                                {status === EventStatus.ACEITO
                                    ? 'Aceitar Evento'
                                    : 'Recusar Evento'}
                            </ModalHeader>
                            <ModalBody>
                                <div className='flex w-full justify-center'>
                                    Deseja realmente
                                    {status === EventStatus.ACEITO
                                        ? ' aceitar '
                                        : ' recusar '}
                                    esse evento ?
                                </div>
                                <div className='flex w-full justify-center font-bold text-primary dark:text-dark-primary'>
                                    Esta ação é permanente!
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
                                    Confirmar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
