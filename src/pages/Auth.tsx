import { useForm } from 'react-hook-form'
import { AxiosError, AxiosResponse } from 'axios'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { AuthDTO, Credentials } from '@/models/user'
import { authenticate } from '@/services/authService'
import { ToggleTheme } from '@/components/ThemeToggle'
import { Link, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { clearUser, setUser } from '@/store/userStore'

export function Auth() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Credentials>()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user.user)


    const authentication = (credentials: Credentials) => {
        dispatch(clearUser())
        authenticate(credentials)
            .then((res: AxiosResponse<AuthDTO>) => {
                dispatch(setUser(res.data))

                if (user) {
                    navigate({ to: '/module' })
                }
            })
            .catch((err: AxiosError) => {
                console.log(err)
                if (err?.request?.status === 0) {
                    toast.error('Conexão com o servidor perdida!', {
                        className:
                            'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                        duration: 3000,
                        description: 'Verifique sua conexão com a internet.',
                    })
                } else if (err?.response?.status === (400 || 403)) {
                    toast.error(err?.response?.data as string, {
                        className:
                            'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                        duration: 3000,
                    })
                } else {
                    toast.error(err?.response?.data as string || 'Erro interno do servidor!', {
                        className:
                            'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                        duration: 3000,
                    })
                }
            })
    }

    return (
        <main className='flex flex-col items-center'>
            <div className='mt-36 flex h-auto w-5/6 justify-center rounded-md bg-background px-6 py-8 dark:border-dark-tertiary dark:bg-dark-background md:w-1/2 md:border md:border-tertiary md:shadow-lg lg:w-auto'>
                <div className='flex h-auto w-full flex-col items-center'>
                    <div className='mb-12 flex w-full justify-center text-2xl font-bold text-primary dark:text-dark-primary'>
                        <span className='flex-grow' />
                        LOGO
                        <span className='flex-grow' />
                        <ToggleTheme classIcon='w-8 h-8' />
                    </div>
                    <form
                        onSubmit={handleSubmit(authentication)}
                        method='POST'
                        className='w-full space-y-8 lg:w-96'
                    >
                        <div className='w-auto'>
                            <Input
                                label='Nome de usuário'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                isInvalid={
                                    errors?.username && 'Input-error'
                                        ? true
                                        : false
                                }
                                {...register('username', {
                                    required: true,
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
                        <div className='w-auto'>
                            <Input
                                label='Senha'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                type='password'
                                isInvalid={
                                    errors?.password && 'Input-error'
                                        ? true
                                        : false
                                }
                                {...register('password', {
                                    required: true,
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
                                className='w-1/2 bg-primary font-semibold text-background dark:bg-dark-primary dark:text-dark-secondary'
                            >
                                Entrar
                            </Button>
                        </div>
                    </form>
                    <motion.div
                        whileHover={{ scale: 1.0, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        className='lg:text-md mt-20 flex rounded-md border-tertiary p-1 text-lg font-semibold text-secondary hover:border hover:text-primary  dark:border-dark-tertiary dark:text-dark-secondary dark:hover:text-dark-primary dark:hover:opacity-100'
                    >
                        <Link to='/register'>Não tem conta? Registre-se</Link>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
