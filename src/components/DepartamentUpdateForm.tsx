import { Unity, UnityUpdateDto } from '@/models/unity'
import { UnityManagerUserDto } from '@/models/unityManager'
import { User } from '@/models/user'
import { getUnityManagersByUnityIds } from '@/services/managerService'
import { getUnity, updateUnity } from '@/services/unityService'
import { getUsers } from '@/services/userService'
import { Button } from '@nextui-org/button'
import {
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
import { AxiosError, AxiosResponse } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface Props {
    id: number
}

export const DepartamentUpdateForm: React.FC<Props> = ({ id }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [unity, setUnity] = useState<Unity>()
    const [managers, setManagers] = useState<UnityManagerUserDto[]>([])
    const [users, setUsers] = useState<User[]>([])
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UnityUpdateDto>()

    const handleUsers = useCallback(() => {
        getUsers().then((res: AxiosResponse<User>) => {
            setUsers(res.data.content)
        }).catch((err:AxiosError) => {
            toast.error(
                (err?.response?.data as string) ||
                    'Usuários não encontrados!',
                {
                    className:
                        'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                    duration: 3000,
                },
            )
        })
    }, [])

    const handleManagers = useCallback(async () => {
        if (unity) {
            const ids = Array.of(unity.id)
            await getUnityManagersByUnityIds(ids as number[])
                .then((res: AxiosResponse<UnityManagerUserDto[]>) => {
                    setManagers(res.data)
                })
                .catch((err: AxiosError) => {
                    toast.error(
                        (err?.response?.data as string) ||
                            'Responsáveis não encontrados!',
                        {
                            className:
                                'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                            duration: 3000,
                        },
                    )
                })
        }
    }, [unity])

    const handleUnity = useCallback(() => {
        if(isOpen && id) {
            getUnity(id).then((res: AxiosResponse<Unity>) => {
                setUnity(res.data)
            }).catch((err:AxiosError) => {
                toast.error(
                    (err?.response?.data as string) ||
                        'Unidade não encontrada!',
                    {
                        className:
                            'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                        duration: 3000,
                    },
                )
            })
        }
    }, [isOpen, id])

    useEffect(() => {
        if(isOpen && id) {
            handleUsers()
            handleUnity()
        }
    }, [isOpen, id, handleUsers, handleUnity])

    useEffect(() => {
        if(isOpen && unity) {
            handleManagers()
        }
    }, [unity, isOpen, handleManagers])

    const send = (dto: UnityUpdateDto) => {
        console.log(dto)
        updateUnity(dto)
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
                        'Erro ao cadastrar departamento!',
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
                size='md'
                radius='md'
                className='w-full bg-primary dark:bg-dark-primary font-semibold text-background dark:text-dark-background'
            >
                Alterar
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
                            <form method='post' onSubmit={handleSubmit(send)}>
                                <ModalHeader className='flex flex-col gap-1'>
                                    <div>Alterar Departamento</div>
                                    <div className='text-sm font-semibold text-primary dark:text-dark-primary'>Campos Obrigatórios*</div>
                                </ModalHeader>
                                <ModalBody className='items-center'>
                                    <div className='w-72'>
                                        <Input
                                            label='Nome do Departamento*'
                                            size='sm'
                                            variant='bordered'
                                            radius='md'
                                            placeholder={unity?.name}
                                            defaultValue={unity?.name}
                                            isInvalid={
                                                errors?.name && 'Input-error'
                                                    ? true
                                                    : false
                                            }
                                            {...register('name', {
                                                required: {
                                                    value: true,
                                                    message:
                                                        'Nome obrigatório!',
                                                },
                                            })}
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
                                    <div className='w-72 '>
                                        <Select
                                            label='Responsável (Chefe de Departamento)*'
                                            variant='bordered'
                                            size='sm'
                                            radius='md'
                                            className='max-w-xs'
                                            placeholder={managers.length > 0 ? managers[0].manager : '--'}
                                            {...register('idUser', {
                                                required: {
                                                    value: true,
                                                    message:
                                                        'Chefe de Departamento obrigatório!',
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
                                                    base: 'before:bg-background before:dark:bg-dark-background',
                                                    content:
                                                        'p-0 border-small border-divider bg-background dark:bg-dark-background',
                                                },
                                            }}
                                        >
                                            {users.map(
                                                u => (
                                                    <SelectItem
                                                        key={u.id}
                                                        value={u.id}
                                                    >
                                                        {`${u.name} - ${u.siape}`}
                                                    </SelectItem>
                                                ),
                                            )}
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
                                        type='submit'
                                        size='md'
                                        radius='md'
                                        onPress={() => {
                                            onClose()
                                        }}
                                        className='w-2/3 bg-success font-semibold text-background'
                                    >
                                        Alterar
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
