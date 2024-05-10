import { ToggleTheme } from '@/components/ThemeToggle'
import { useStorage } from '@/hooks/storageHook'
import { Role } from '@/models/user'
import { Link } from '@tanstack/react-router'
import { Component, Landmark, User } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Module() {
    const enabledStyle =`flex min-h-56 w-56 flex-col items-center justify-center space-y-4 rounded-md border 
        border-tertiary px-2 py-4 text-lg font-semibold text-secondary shadow-lg hover:text-primary dark:border-dark-tertiary 
        dark:text-dark-secondary dark:hover:text-dark-primary`

    const disabledStyle =`flex min-h-56 w-56 flex-col items-center justify-center space-y-4 rounded-md border 
        border-tertiary px-2 py-4 text-lg font-semibold text-secondary shadow-lg opacity-20`

    const { user } = useStorage()
    const [disableDep, setDisableDep] = useState<boolean>(true)
    const [disableReit, setDisableReit] = useState<boolean>(true)
    const [styleDep, setStyleDep] = useState<string>(disabledStyle)
    const [styleReit, setStyleReit] = useState<string>(disabledStyle)

    useEffect(() => {
        const checkUserTypeAndButtonStyle = async () => {
            const type = user?.role

            if (type === Role.PRO_REITOR) {
                setDisableReit(false)
                setStyleReit(enabledStyle)
            }

            if (type === Role.CHEFE_DEPARTAMENTO) {
                setDisableDep(false)
                setStyleDep(enabledStyle)
            }
        }

        checkUserTypeAndButtonStyle()
    }, [])

    return (
        <main className='flex flex-col items-center'>
            <div className='mt-10 flex h-auto w-full min-w-12 justify-center rounded-md bg-background px-6 py-8 dark:border-dark-tertiary dark:bg-dark-background md:mt-28 md:w-auto md:border md:border-tertiary md:shadow-lg'>
                <div className='flex h-auto w-full flex-col items-center'>
                    <div className='mb-12 flex w-full justify-center text-2xl font-bold text-primary dark:text-dark-primary'>
                        <span className='flex-grow' />
                        <div className='flex flex-col'>Logo</div>
                        <span className='flex-grow' />
                        <ToggleTheme width='8' height='8' />
                    </div>
                    <div className='flex flex-col space-y-8 md:flex-row md:space-x-5 md:space-y-0'>
                        <Link to='/servidor'>
                            <div
                                className='flex min-h-56 w-56 flex-col items-center justify-center space-y-4 
                                rounded-md border border-tertiary px-2 py-4 text-lg font-semibold text-secondary 
                                shadow-lg hover:text-primary dark:border-dark-tertiary dark:text-dark-secondary dark:hover:text-dark-primary'
                            >
                                <User className='h-20 w-20 ' />
                                <span>Servidor</span>
                            </div>
                        </Link>
                        <Link to='/departamento' disabled={disableDep}>
                            <div className={styleDep}>
                                <Component className='h-20 w-20' />
                                <span>Departamento</span>
                            </div>
                        </Link>
                        <Link to='/reitoria' disabled={disableReit}>
                            <div className={styleReit}>
                                <Landmark className='h-20 w-20' />
                                <span>Reitoria</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
