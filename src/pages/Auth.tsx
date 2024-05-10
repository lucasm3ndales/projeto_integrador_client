import { useForm } from 'react-hook-form'
import { AxiosError, AxiosResponse } from 'axios'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { AuthDTO, Credentials } from '@/models/user'
import { useStorage } from '@/hooks/storageHook'
import { authenticate } from '@/services/authService'
import { ToggleTheme } from '@/components/ThemeToggle'
import { Link, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export function Auth() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Credentials>()
    const { saveUser, user } = useStorage()
    const navigate = useNavigate({ from: '/' })

    const authentication = (credentials: Credentials) => {
        authenticate(credentials)
            .then((res: AxiosResponse<AuthDTO>) => {
                //console.log(res)
                saveUser(res.data)

                if (user) {
                    navigate({ to: '/module' })
                }
            })
            .catch((err: AxiosError) => {
                //console.log(err)
                if (err?.response?.status === (400 || 403)) {
                    toast.error(err?.response?.data as string, {
                        className:
                            'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                        duration: 3000
                    })
                } else {
                    toast.error(err?.response?.data as string, {
                        className:
                            'bg-background dark:bg-dark-background text-primary dark:text-dark-primary border border-tertiary dark:border-dark-tertiary',
                        duration: 3000
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
                        <ToggleTheme width='8' height='8' />
                    </div>
                    <form onSubmit={handleSubmit(authentication)} method='POST' className='w-full space-y-8 lg:w-96'>
                        <div className='w-auto'>
                            <Input
                                label='Nome de usuário'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                isInvalid={errors?.username && 'Input-error' ? true : false}
                                {...register('username', {
                                    required: true
                                })}
                            />
                        </div>
                        <div className='w-auto'>
                            <Input
                                label='Senha'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                type='password'
                                isInvalid={errors?.password && 'Input-error' ? true : false}
                                {...register('password', {
                                    required: true
                                })}
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
                    <div className='lg:text-md mt-20 flex text-lg font-semibold text-secondary  hover:text-primary hover:opacity-70 dark:text-dark-secondary dark:hover:text-dark-primary dark:hover:opacity-100'>
                        <Link to='/register'>Não tem conta? Registre-se</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
