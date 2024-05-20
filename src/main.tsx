import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <NextUIProvider>
            <NextThemesProvider attribute='class' defaultTheme='light' themes={['light', 'dark']}>
                <App />
            </NextThemesProvider>
        </NextUIProvider>
    </React.StrictMode>
)
