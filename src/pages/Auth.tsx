import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { AxiosError, AxiosResponse } from 'axios'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { AuthDTO, Credentials } from '@/models/user'
import { useStorage } from '@/hooks/storageHook'
import { authenticate } from '@/services/authService'
import { ToggleTheme } from '@/components/ThemeToggle'
import { Link, useNavigate } from '@tanstack/react-router'

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
                    toast(err?.response?.data as string, { type: 'warning' })
                } else {
                    toast(err?.response?.data as string, { type: 'error' })
                }
            })
    }

    return (
        <main className='flex flex-col items-center'>
            <div className='flex justify-center lg:w-auto md:w-1/2 w-5/6 h-auto mt-36 px-6 py-8 md:border md:border-tertiary dark:border-dark-tertiary rounded-md md:shadow-lg bg-background dark:bg-dark-background'>
                <div className='flex flex-col items-center w-full h-auto'>
                    <div className='flex justify-center w-full text-primary dark:text-dark-primary font-bold text-2xl mb-12'>
                        <span className='flex-grow' />
                        LOGO
                        <span className='flex-grow' />
                        <ToggleTheme width='8' height='8' />
                    </div>
                    <form
                        onSubmit={handleSubmit(authentication)}
                        method='POST'
                        className='space-y-8 lg:w-96 w-full'
                    >
                        <div className='w-auto'>
                            <Input
                                label='Nome de usuário'
                                size='sm'
                                variant='bordered'
                                radius='md'
                                isInvalid={errors?.username && 'Input-error' ? true : false}
                                {...register('username')}
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
                                {...register('password')}
                            />
                        </div>
                        <div className='text-center w-full'>
                            <Button
                                type='submit'
                                size='lg'
                                radius='md'
                                className='w-1/2 font-semibold text-background dark:text-dark-secondary bg-primary dark:bg-dark-primary'
                            >
                                Entrar
                            </Button>
                        </div>
                    </form>
                    <div className='flex mt-20 lg:text-md text-lg font-semibold text-secondary  dark:text-dark-secondary hover:text-primary hover:opacity-70 dark:hover:opacity-100 dark:hover:text-dark-primary'>
                        <Link to='/register'>Não tem conta? Registre-se</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
