import { Link } from '@tanstack/react-router'
import { BookMarked, Component, HandCoins } from 'lucide-react'
import { motion } from "framer-motion"

export function ServantHome() {
    return (
        <main className='flex h-full w-full flex-col lg:space-y-44 items-center justify-center'>
            <div className='mb-10 hidden h-auto w-full justify-center border-b border-tertiary p-2 text-lg font-semibold text-secondary dark:border-dark-tertiary dark:text-dark-secondary lg:flex'>
                Seja Bem Vindo!
            </div>
            <div className='mb-10 mt-28 flex text-lg font-semibold text-secondary dark:border-dark-tertiary dark:text-dark-secondary lg:hidden'>
                Seja Bem Vindo!
            </div>
            <div className='flex flex-col space-y-8 md:flex-row md:space-x-10 md:space-y-0'>
                <Link to='/event'>
                    <motion.div
                        whileHover={{ scale: 1.08, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        className='flex min-h-56 w-56 flex-col items-center justify-center space-y-4 
                                    rounded-md border border-tertiary px-2 py-4 text-lg font-semibold text-secondary 
                                    shadow-lg hover:text-primary dark:border-dark-tertiary dark:text-dark-secondary dark:hover:text-dark-primary'
                    >
                        <BookMarked className='w-10 h-10'/>
                        <span>Eventos</span>
                    </motion.div>
                </Link>
                <Link to='/expense'>
                    <motion.div
                        whileHover={{ scale: 1.08, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        className='flex min-h-56 w-56 flex-col items-center justify-center space-y-4 
                                    rounded-md border border-tertiary px-2 py-4 text-lg font-semibold text-secondary 
                                    shadow-lg hover:text-primary dark:border-dark-tertiary dark:text-dark-secondary dark:hover:text-dark-primary'
                    >
                        <HandCoins className='w-10 h-10'/>
                        <span>Despesas</span>
                    </motion.div>
                </Link>
                <Link to='/departament'>
                    <motion.div
                        whileHover={{ scale: 1.08, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        className='flex min-h-56 w-56 flex-col items-center justify-center space-y-4 mb-5
                                    rounded-md border border-tertiary px-2 py-4 text-lg font-semibold text-secondary 
                                    shadow-lg hover:text-primary dark:border-dark-tertiary dark:text-dark-secondary dark:hover:text-dark-primary'
                    >
                        <Component className='w-10 h-10'/>
                        <span>Departamentos</span>
                    </motion.div>
                </Link>
            </div>
        </main>
    )
}
