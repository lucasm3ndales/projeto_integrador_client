import { UnitySaveDTO, UnityType } from '@/models/unity'
import { User } from '@/models/user'
import { saveUnity } from '@/services/unityService'
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

export const DepartamentSaveForm = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [users, setUsers] = useState<User[]>([])
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UnitySaveDTO>({
        defaultValues: {
            type: UnityType.DEPARTAMENTO,
            name: '',
            idUser: null,
        },
    })

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

    useEffect(() => {
        if(isOpen) {
            handleUsers()
        }
    }, [isOpen, handleUsers])

    const send = (dto: UnitySaveDTO) => {
        saveUnity(dto)
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
                size='lg'
                radius='md'
                className='w-full bg-success font-semibold text-background'
            >
                Novo Departamento
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
                                    <div>Cadastrar Novo Departamento</div>
                                    <div className='text-sm font-semibold text-primary dark:text-dark-primary'>Campos Obrigatórios*</div>
                                </ModalHeader>
                                <ModalBody className='items-center'>
                                    <div className='w-72'>
                                        <Input
                                            label='Nome do Departamento*'
                                            size='sm'
                                            variant='bordered'
                                            radius='md'
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
                                        Salvar
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
