import { ToggleTheme } from '@/components/ThemeToggle'
import { UserDTO } from '@/models/user'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { saveUser } from '@/services/userService'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

interface RegisterForm extends UserDTO {
    pwdConfirm: string
}

export function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<RegisterForm>()

    const navigate = useNavigate()

    const [isVisible, setIsVisible] = useState<boolean>(false)

    const [emailRegex] = useState<RegExp>(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
    )

    const [siapeRegex] = useState<RegExp>(/^[0-9]{7}$/)

    const [phoneRegex] = useState<RegExp>(
        /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/,
    )

    const checkPass = () => {
        const { password, pwdConfirm } = getValues()

        return password === pwdConfirm || 'As senhas não coincidem!'
    }

    const toggleIsVisible = () => {
        setIsVisible(!isVisible)
    }

    const registration = (dto: UserDTO) => {
        saveUser(dto)
            .then((res: AxiosResponse<string>) => {
                toast.success(res?.data as string, {
                    className:
                        'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                    duration: 3000,
                })
                navigate({ to: '/' })
            })
            .catch((err: AxiosError) => {
                if (err?.response?.status === (400 || 403)) {
                    toast.error(err?.response?.data as string, {
                        className:
                            'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                        duration: 3000,
                    })
                } else {
                    toast.error(err?.response?.data as string, {
                        className:
                            'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                        duration: 3000,
                    })
                }
            })
    }
    return (
        <main className='flex flex-col items-center'>
            <div className='mt-5 flex h-auto w-full justify-center rounded-md bg-background px-4 py-6 dark:border-dark-tertiary dark:bg-dark-background md:w-2/3 md:border md:border-tertiary md:shadow-lg lg:w-3/5'>
                <div className='flex h-auto w-full flex-col items-center'>
                    <div className='mb-12 flex w-full justify-center text-2xl font-bold text-primary dark:text-dark-primary'>
                        <div className='flex flex-col'>
                            <h2 className='text-secondary dark:text-dark-secondary'>
                                Registro de Usuário
                            </h2>
                            <p className='text-sm'>Campos obrigatórios*</p>
                        </div>
                        <span className='flex-grow' />
                        <ToggleTheme classIcon='w-8 h-8 text-primary dark:text-dark-primary' />
                    </div>
                    <div className='flex w-full flex-col space-y-8 md:flex-row'>
                        <div className='flex w-full items-center justify-center text-3xl font-bold text-primary dark:text-dark-primary md:w-2/5 md:flex-col'>
                            LOGO
                        </div>
                        <div className='flex w-full items-center justify-center md:w-3/5 md:flex-col'>
                            <form
                                onSubmit={handleSubmit(registration)}
                                method='POST'
                                className='w-full space-y-5 md:space-y-3 lg:max-w-96'
                            >
                                <div className='w-auto'>
                                    <Input
                                        label='Nome Completo*'
                                        size='sm'
                                        variant='bordered'
                                        radius='md'
                                        isInvalid={
                                            errors?.name && 'Input-error'
                                                ? true
                                                : false
                                        }
                                        errorMessage={errors?.name?.message}
                                        {...register('name', {
                                            required: {
                                                value: true,
                                                message: 'Nome obrigatório!',
                                            },
                                            minLength: {
                                                value: 2,
                                                message: 'Nome muito curto!',
                                            },
                                        })}
                                        classNames={{
                                            input: ['bg-transparent '],
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
                                <div className='w-auto'>
                                    <Input
                                        label='E-mail*'
                                        size='sm'
                                        variant='bordered'
                                        radius='md'
                                        type='email'
                                        isInvalid={
                                            errors?.email && 'Input-error'
                                                ? true
                                                : false
                                        }
                                        errorMessage={errors?.email?.message}
                                        {...register('email', {
                                            required: {
                                                value: true,
                                                message: 'E-mail obrigatório!',
                                            },
                                            pattern: {
                                                value: emailRegex,
                                                message:
                                                    'Formato de e-mail inválido!',
                                            },
                                        })}
                                        classNames={{
                                            input: ['bg-transparent '],
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
                                <div className='w-auto'>
                                    <Input
                                        label='Telefone*'
                                        size='sm'
                                        variant='bordered'
                                        radius='md'
                                        maxLength={11}
                                        isInvalid={
                                            errors?.phone && 'Input-error'
                                                ? true
                                                : false
                                        }
                                        errorMessage={errors?.phone?.message}
                                        {...register('phone', {
                                            required: {
                                                value: true,
                                                message:
                                                    'Telefone obrigatório!',
                                            },
                                            pattern: {
                                                value: phoneRegex,
                                                message:
                                                    'Formato de telefone inválido!',
                                            },
                                            minLength: {
                                                value: 11,
                                                message:
                                                    'Telefone dever ter onze dígitos!',
                                            },
                                            maxLength: {
                                                value: 11,
                                                message:
                                                    'Telefone dever ter onze dígitos!',
                                            },
                                        })}
                                        classNames={{
                                            input: ['bg-transparent '],
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
                                <div className='w-auto'>
                                    <Input
                                        label='Matrícula/SIAPE*'
                                        size='sm'
                                        variant='bordered'
                                        radius='md'
                                        maxLength={7}
                                        isInvalid={
                                            errors?.siape && 'Input-error'
                                                ? true
                                                : false
                                        }
                                        errorMessage={errors?.siape?.message}
                                        {...register('siape', {
                                            required: {
                                                value: true,
                                                message:
                                                    'Matrícula obrigatória!',
                                            },
                                            pattern: {
                                                value: siapeRegex,
                                                message:
                                                    'Formato de matrícula inválido!',
                                            },
                                            minLength: {
                                                value: 7,
                                                message:
                                                    'Matrícula dever ter sete dígitos!',
                                            },
                                            maxLength: {
                                                value: 7,
                                                message:
                                                    'Matrícula dever ter sete dígitos!',
                                            },
                                        })}
                                        classNames={{
                                            input: ['bg-transparent '],
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
                                <div className='w-auto'>
                                    <Input
                                        label='Nome de Usuário*'
                                        size='sm'
                                        variant='bordered'
                                        radius='md'
                                        isInvalid={
                                            errors?.username && 'Input-error'
                                                ? true
                                                : false
                                        }
                                        errorMessage={errors?.username?.message}
                                        {...register('username', {
                                            required: {
                                                value: true,
                                                message:
                                                    'Nome de Usuário obrigatório!',
                                            },
                                            minLength: {
                                                value: 4,
                                                message:
                                                    'Nome de Usuário muito curto!',
                                            },
                                        })}
                                        classNames={{
                                            input: ['bg-transparent '],
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
                                <div className='w-auto'>
                                    <Input
                                        label='Senha*'
                                        size='sm'
                                        variant='bordered'
                                        radius='md'
                                        type={isVisible ? 'text' : 'password'}
                                        endContent={
                                            <button
                                                type='button'
                                                onClick={toggleIsVisible}
                                                className='text-secondary hover:text-primary dark:text-dark-secondary dark:hover:text-dark-primary'
                                            >
                                                {!isVisible && (
                                                    <EyeOff className='h-6 w-6' />
                                                )}
                                                {isVisible && (
                                                    <Eye className='h-6 w-6' />
                                                )}
                                            </button>
                                        }
                                        isInvalid={
                                            errors?.password && 'Input-error'
                                                ? true
                                                : false
                                        }
                                        errorMessage={errors?.password?.message}
                                        {...register('password', {
                                            required: {
                                                value: true,
                                                message: 'Senha obrigatória!',
                                            },
                                            minLength: {
                                                value: 6,
                                                message: 'Senha muito curta!',
                                            },
                                        })}
                                        classNames={{
                                            input: ['bg-transparent '],
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
                                <div className='w-auto'>
                                    <Input
                                        label='Confirmar senha*'
                                        size='sm'
                                        variant='bordered'
                                        radius='md'
                                        type={isVisible ? 'text' : 'password'}
                                        endContent={
                                            <button
                                                type='button'
                                                onClick={toggleIsVisible}
                                                className='text-secondary hover:text-primary dark:text-dark-secondary dark:hover:text-dark-primary'
                                            >
                                                {!isVisible && (
                                                    <EyeOff className='h-6 w-6' />
                                                )}
                                                {isVisible && (
                                                    <Eye className='h-6 w-6' />
                                                )}
                                            </button>
                                        }
                                        isInvalid={
                                            errors?.pwdConfirm && 'Input-error'
                                                ? true
                                                : false
                                        }
                                        errorMessage={
                                            errors?.pwdConfirm?.message
                                        }
                                        {...register('pwdConfirm', {
                                            required: {
                                                value: true,
                                                message: 'Senha obrigatória!',
                                            },
                                            minLength: {
                                                value: 6,
                                                message: 'Senha muito curta!',
                                            },
                                            validate: checkPass,
                                        })}
                                        classNames={{
                                            input: ['bg-transparent '],
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
                                <div className='w-full text-center'>
                                    <Button
                                        type='submit'
                                        size='lg'
                                        radius='md'
                                        className='w-1/2 bg-success font-semibold text-background'
                                    >
                                        Registrar-se
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='flex w-full justify-start'>
                        <motion.div
                            whileHover={{ scale: 1.0, y: -10 }}
                            whileTap={{ scale: 0.95 }}
                            className='lg:text-md mt-5 flex justify-start rounded-md border-tertiary p-1 text-lg font-semibold text-secondary hover:border hover:text-primary  dark:border-dark-tertiary dark:text-dark-secondary dark:hover:text-dark-primary dark:hover:opacity-100'
                        >
                            <Link to='/'>Já tem conta? Acessar</Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    )
}
