import { ToggleTheme } from '@/components/ThemeToggle'
import { useStorage } from '@/hooks/storageHook'
import { Tooltip } from '@nextui-org/tooltip'
import { Link, Outlet, useNavigate } from '@tanstack/react-router'
import {
    BookMarked,
    CircleUserRound,
    CircleX,
    Component,
    HandCoins,
    Home,
    LogOut,
    Menu
} from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

export function Servant() {
    const { user, removeUser } = useStorage()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const logout = () => {
        if (user) {
            removeUser()
            navigate({ to: '/' })
        }
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            {!isOpen && (
                <div className='fixed top-0 z-40 flex h-auto w-full border-b border-tertiary bg-background px-2 py-4 shadow-lg dark:border-dark-tertiary dark:bg-dark-background lg:hidden'>
                    <div className='flex h-auto w-full justify-between rounded-md p-1 text-2xl font-bold text-primary  dark:text-dark-primary'>
                        <Menu
                            className='flex h-10 w-10 rounded-md bg-transparent p-1 text-secondary hover:bg-tertiary hover:bg-opacity-5 hover:text-primary dark:text-dark-secondary dark:hover:bg-dark-tertiary dark:hover:text-dark-primary'
                            onClick={toggleMenu}
                        />
                        Logo
                    </div>
                </div>
            )}

            {isOpen && (
                <span className='fixed inset-0 z-40 h-screen w-screen backdrop-blur-md lg:hidden' />
            )}

            {isOpen && (
                <motion.div
                    initial={{width: 0}}
                    animate={{ width: 176 }}
                    exit={{ width: 0 }}
                    className='fixed z-50 flex h-screen w-44 flex-col space-y-6 border-e border-tertiary bg-background px-2 py-4 dark:border-dark-tertiary dark:bg-dark-background lg:hidden'
                >
                    <div 
                        
                        className='mb-8 flex items-center justify-between p-1'>
                        <div className='p-1 text-2xl font-bold text-primary dark:text-dark-primary'>
                            Logo
                        </div>
                        <CircleX
                            className='h-6 w-6 text-secondary hover:text-primary dark:text-dark-secondary dark:hover:text-dark-primary'
                            onClick={() => setIsOpen(false)}
                        />
                    </div>
                    <Link to='/servant-home'>
                        <div className='text-md itens-center flex h-auto w-auto rounded-md bg-transparent p-1 font-semibold text-secondary hover:bg-tertiary hover:bg-opacity-5 hover:text-primary dark:text-dark-secondary dark:hover:bg-dark-tertiary dark:hover:text-dark-primary'>
                            <Home className='me-3 h-6 w-6' />
                            Início
                        </div>
                    </Link>
                    <Link to='/events'>
                        <div className='text-md itens-center flex h-auto w-auto rounded-md bg-transparent p-1 font-semibold text-secondary hover:bg-tertiary hover:bg-opacity-5 hover:text-primary dark:text-dark-secondary dark:hover:bg-dark-tertiary dark:hover:text-dark-primary'>
                            <BookMarked className='me-3 h-6 w-6' />
                            Eventos
                        </div>
                    </Link>
                    <Link to='/expenses'>
                        <div className='text-md itens-center flex h-auto w-auto rounded-md bg-transparent p-1 font-semibold text-secondary hover:bg-tertiary hover:bg-opacity-5 hover:text-primary dark:text-dark-secondary dark:hover:bg-dark-tertiary dark:hover:text-dark-primary'>
                            <HandCoins className='me-3 h-6 w-6' />
                            Despesas
                        </div>
                    </Link>
                    <Link to='/departaments'>
                        <div className='text-md itens-center flex h-auto w-auto rounded-md bg-transparent p-1 font-semibold text-secondary hover:bg-tertiary hover:bg-opacity-5 hover:text-primary dark:text-dark-secondary dark:hover:bg-dark-tertiary dark:hover:text-dark-primary'>
                            <Component className='me-3 h-6 w-6' />
                            Departamentos
                        </div>
                    </Link>
                    <span className='flex-grow' />

                    <div className='text-md itens-center flex h-auto w-auto rounded-md bg-transparent p-1 font-semibold text-secondary hover:bg-tertiary hover:bg-opacity-5 hover:text-primary dark:text-dark-secondary dark:hover:bg-dark-tertiary dark:hover:text-dark-primary'>
                        <ToggleTheme
                            classIcon='w-6 h-6 me-3'
                            title='Tema'
                            classBtn='flex w-auto h-auto'
                        />
                    </div>

                    <Link to='/module'>
                        <div className='text-md itens-center flex h-auto w-auto rounded-md bg-transparent p-1 font-semibold text-secondary hover:bg-tertiary hover:bg-opacity-5 hover:text-primary dark:text-dark-secondary dark:hover:bg-dark-tertiary dark:hover:text-dark-primary'>
                            <CircleUserRound className='me-3 h-6 w-6' />
                            Usuário
                        </div>
                    </Link>

                    <div
                        className='text-md itens-center flex h-auto w-auto rounded-md bg-transparent p-1 font-semibold text-secondary hover:bg-tertiary hover:bg-opacity-5 hover:text-primary dark:text-dark-secondary dark:hover:bg-dark-tertiary dark:hover:text-dark-primary'
                        onClick={logout}
                    >
                        <LogOut className='me-3 h-6 w-6' />
                        Sair
                    </div>
                </motion.div>
            )}

            <div className='fixed hidden h-screen w-24 flex-col items-center space-y-6 border-e border-tertiary bg-background px-2 py-4 dark:border-dark-tertiary dark:bg-dark-background lg:flex'>
                <div className='text-2xl font-bold text-primary dark:text-dark-primary'>
                    Logo
                </div>
                <Link to='/servant'>
                    <Tooltip
                        content='Início'
                        placement='right-end'
                        color='default'
                    >
                        <div className='h-auto w-auto rounded-md bg-transparent p-1 hover:bg-tertiary hover:bg-opacity-5 dark:hover:bg-dark-tertiary'>
                            <Home className='h-8 w-8 text-secondary hover:text-primary dark:text-dark-secondary dark:hover:text-dark-primary' />
                        </div>
                    </Tooltip>
                </Link>
                <Link to='/events'>
                    <Tooltip
                        content='Eventos'
                        placement='right-end'
                        color='default'
                    >
                        <div className='h-auto w-auto rounded-md bg-transparent p-1 hover:bg-tertiary hover:bg-opacity-5 dark:hover:bg-dark-tertiary'>
                            <BookMarked className='h-8 w-8 text-secondary hover:text-primary dark:text-dark-secondary dark:hover:text-dark-primary' />
                        </div>
                    </Tooltip>
                </Link>
                <Link to='/expenses'>
                    <Tooltip
                        content='Despesas'
                        placement='right-end'
                        color='default'
                    >
                        <div className='h-auto w-auto rounded-md bg-transparent p-1 hover:bg-tertiary hover:bg-opacity-5 dark:hover:bg-dark-tertiary'>
                            <HandCoins className='h-8 w-8 text-secondary hover:text-primary dark:text-dark-secondary dark:hover:text-dark-primary' />
                        </div>
                    </Tooltip>
                </Link>
                <Link to='/departaments'>
                    <Tooltip
                        content='Departamentos'
                        placement='right-end'
                        color='default'
                    >
                        <div className='h-auto w-auto rounded-md bg-transparent p-1 hover:bg-tertiary hover:bg-opacity-5 dark:hover:bg-dark-tertiary'>
                            <Component className='h-8 w-8 text-secondary hover:text-primary dark:text-dark-secondary dark:hover:text-dark-primary' />
                        </div>
                    </Tooltip>
                </Link>
                <span className='flex-grow' />
                <Tooltip
                    content='Tema escuro/claro'
                    placement='right-end'
                    color='default'
                >
                    <div className='items-centerw-auto flex h-auto rounded-md bg-transparent p-1 hover:bg-tertiary hover:bg-opacity-5 dark:hover:bg-dark-tertiary'>
                        <ToggleTheme classIcon='w-8 h-8 text-secondary hover:text-primary dark:text-dark-secondary dark:hover:text-dark-primary' />
                    </div>
                </Tooltip>
                <Link to='/module'>
                    <Tooltip
                        content='Usuário'
                        placement='right-end'
                        color='default'
                    >
                        <div className='h-auto w-auto rounded-md bg-transparent p-1 hover:bg-tertiary hover:bg-opacity-5 dark:hover:bg-dark-tertiary'>
                            <CircleUserRound className='h-8 w-8 text-secondary hover:text-primary dark:text-dark-secondary dark:hover:text-dark-primary' />
                        </div>
                    </Tooltip>
                </Link>
                <Tooltip content='Sair' placement='right-end' color='default'>
                    <div className='h-auto w-auto rounded-md bg-transparent p-1 hover:bg-tertiary hover:bg-opacity-5 dark:hover:bg-dark-tertiary'>
                        <LogOut
                            className='h-8 w-8 text-secondary hover:text-primary dark:text-dark-secondary dark:hover:text-dark-primary'
                            onClick={logout}
                        />
                    </div>
                </Tooltip>
            </div>
            <Outlet />
        </>
    )
}
