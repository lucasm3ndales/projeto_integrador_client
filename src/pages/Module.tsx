import { ToggleTheme } from '@/components/ThemeToggle'
import { useStorage } from '@/hooks/storageHook'
import { Role } from '@/models/user'
import { Link } from '@tanstack/react-router'
import { Component, Landmark, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function Module() {
    const enabledStyle = `flex min-h-56 w-56 flex-col items-center justify-center space-y-4 rounded-md border 
        border-tertiary px-2 py-4 text-lg font-semibold text-secondary shadow-lg hover:text-primary dark:border-dark-tertiary 
        dark:text-dark-secondary dark:hover:text-dark-primary`

    const disabledStyle = `flex min-h-56 w-56 flex-col items-center justify-center space-y-4 rounded-md border 
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
                        <ToggleTheme classIcon='w-8 h-8' />
                    </div>
                    <div className='flex flex-col space-y-8 md:flex-row md:space-x-5 md:space-y-0'>
                        <Link to='/servant'>
                            <motion.div
                                whileHover={{ scale: 1.08, y: -10 }}
                                whileTap={{ scale: 0.95 }}
                                className='flex min-h-56 w-56 flex-col items-center justify-center space-y-4 
                                rounded-md border border-tertiary px-2 py-4 text-lg font-semibold text-secondary 
                                shadow-lg hover:text-primary dark:border-dark-tertiary dark:text-dark-secondary dark:hover:text-dark-primary'
                            >
                                <User className='h-20 w-20 ' />
                                <span>Servidor</span>
                            </motion.div>
                        </Link>
                        <Link to='/departament' disabled={disableDep}>
                            <motion.div
                                whileHover={!disableDep ? { scale: 1.08, y: -10 } : {}}
                                whileTap={!disableDep ? { scale: 0.95 } : {}}
                                className={styleDep}
                            >
                                <Component className='h-20 w-20' />
                                <span>Departamento</span>
                            </motion.div>
                        </Link>
                        <Link to='/rectory' disabled={disableReit}>
                            <motion.div
                                whileHover={!disableReit ? { scale: 1.08, y: -10 } : {}}
                                whileTap={!disableReit ? { scale: 0.95 } : {}}
                                className={styleReit}
                            >
                                <Landmark className='h-20 w-20' />
                                <span>Reitoria</span>
                            </motion.div>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
