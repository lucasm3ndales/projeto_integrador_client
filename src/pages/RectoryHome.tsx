import { Link } from '@tanstack/react-router'
import { BookMarked, Component } from 'lucide-react'
import { motion } from 'framer-motion'

export function RectoryHome() {
    return (
        <main className='flex h-full w-full flex-col items-center justify-center lg:space-y-44'>
            <div className='mb-10 hidden h-auto w-full justify-center border-b border-tertiary p-2 text-lg font-semibold text-secondary dark:border-dark-tertiary dark:text-dark-secondary lg:flex'>
                Seja Bem Vindo!
            </div>
            <div className='mb-10 mt-28 flex text-lg font-semibold text-secondary dark:border-dark-tertiary dark:text-dark-secondary lg:hidden'>
                Seja Bem Vindo!
            </div>
            <div className='flex flex-col space-y-8 md:flex-row md:space-x-10 md:space-y-0'>
                <Link from='/rectory' to='/event-rec'>
                    <motion.div
                        whileHover={{ scale: 1.08, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        className='flex min-h-56 w-56 flex-col items-center justify-center space-y-4 
                                    rounded-md border border-tertiary px-2 py-4 text-lg font-semibold text-secondary 
                                    shadow-lg hover:text-primary dark:border-dark-tertiary dark:text-dark-secondary dark:hover:text-dark-primary'
                    >
                        <BookMarked className='h-10 w-10' />
                        <span>Eventos</span>
                    </motion.div>
                </Link>
                <Link from='/rectory' to='/departament-rec'>
                    <motion.div
                        whileHover={{ scale: 1.08, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        className='mb-5 flex min-h-56 w-56 flex-col items-center justify-center space-y-4
                                    rounded-md border border-tertiary px-2 py-4 text-lg font-semibold text-secondary 
                                    shadow-lg hover:text-primary dark:border-dark-tertiary dark:text-dark-secondary dark:hover:text-dark-primary'
                    >
                        <Component className='h-10 w-10' />
                        <span>Departamentos</span>
                    </motion.div>
                </Link>
            </div>
        </main>
    )
}
