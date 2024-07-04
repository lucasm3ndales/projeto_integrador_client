import { ProcedureDTO } from '@/models/procedure'
import { Unity, UnityFilter, UnityType } from '@/models/unity'
import { Role, User } from '@/models/user'
import { procedure } from '@/services/procedureService'
import { getUnities } from '@/services/unityService'
import { Button } from '@nextui-org/button'
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    useDisclosure,
} from '@nextui-org/react'
import { AxiosError, AxiosResponse } from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

interface Props {
    originId: number
    eventId: number
    userRole: Role
    unityType: UnityType
    destiny?: User
    setRender: (value: React.SetStateAction<boolean>) => void

}

export const ProcedureModal: React.FC<Props> = ({
    originId,
    eventId,
    userRole,
    unityType,
    destiny,
    setRender
}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [unities, setUnities] = useState<Unity[]>([])
    const [procedureDTO, setProcedureDTO] = useState<ProcedureDTO>({
        destinyId: null,
        originId: originId,
        eventId: eventId,
    })

    const unity = useMemo(() => {
        if (
            destiny &&
            destiny.unityManagers &&
            destiny.unityManagers.length > 0
        ) {
            const sorted = destiny.unityManagers.sort(
                (a, b) => Number(b.startedOn) - Number(a.startedOn),
            )
            if (sorted[0] && !sorted[0].leftOn) {
                return sorted[0].unity
            }
        }
    }, [destiny])

    useEffect(() => {
        if (unity && unityType === UnityType.DEPARTAMENTO) {
            setProcedureDTO(state => ({
                ...state,
                destinyId: unity?.id,
            }))
        }
    }, [unityType, unity])

    useEffect(() => {
        const unityFilter: UnityFilter = {
            type: unityType,
        }

        if (
            unities &&
            unities.length <= 0
        ) {
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
    }, [unities, unityType])

    const send = () => {
        procedure(procedureDTO)
            .then((res: AxiosResponse) => {
                toast.success(res.data as string, {
                    className:
                        'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                    duration: 3000,
                })
                setRender(true)
            })
            .catch((err: AxiosError) => {
                toast.error(
                    (err?.response?.data as string) ||
                        'Erro ao efetuar trâmite!',
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
            {userRole &&
                (userRole === Role.CHEFE_DEPARTAMENTO ? (
                    <>
                        <Button
                            onPress={onOpen}
                            type='button'
                            size='lg'
                            radius='md'
                            className='w-56 bg-primary font-semibold text-background dark:bg-dark-primary dark:text-dark-background'
                        >
                            Tramitar
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
                                        <ModalHeader className='flex flex-col gap-1 text-lg font-bold text-secondary dark:text-dark-secondary'>
                                            Escolha um destinatário para o
                                            trâmite
                                        </ModalHeader>
                                        <ModalBody>
                                            <div className='flex w-full justify-center'>
                                                <Select
                                                    label='Destinatário'
                                                    variant='bordered'
                                                    size='sm'
                                                    radius='md'
                                                    className='max-w-xs'
                                                    onChange={e =>
                                                        setProcedureDTO(
                                                            state => ({
                                                                ...state,
                                                                destinyId:
                                                                    Number(
                                                                        e.target
                                                                            .value,
                                                                    ),
                                                            }),
                                                        )
                                                    }
                                                    classNames={{
                                                        label: 'text-secondary dark:text-dark-secondary',
                                                        trigger:
                                                            'bg-transaparent border border-tertiary dark:border-dark-tertiary hover:border-primary dark:hover:border-dark-primary',
                                                        listboxWrapper:
                                                            'max-h-[400px]',
                                                        errorMessage:
                                                            'text-error',
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
                                                            value={
                                                                u.id as number
                                                            }
                                                        >
                                                            {`${u.name.toLowerCase()} - ${u.type.toString().toLocaleLowerCase()}`}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
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
                                                Tramitar
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </>
                ) : (
                    <>
                        <Button
                            onPress={onOpen}
                            type='button'
                            size='lg'
                            radius='md'
                            className='w-56 bg-primary font-semibold text-background dark:bg-dark-primary dark:text-dark-background'
                        >
                            Retornar Trâmite
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
                                        <ModalHeader className='flex flex-col gap-1 text-lg font-bold text-secondary dark:text-dark-secondary'>
                                            Retornar Trâmite
                                        </ModalHeader>
                                        <ModalBody>
                                            <div className='flex w-full justify-center text-lg text-primary dark:text-dark-primary'>
                                                Deseja retornar o trâmite para{' '}
                                                {unity?.name} ?
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
                                                Tramitar
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </>
                ))}
        </>
    )
}
