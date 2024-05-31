import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Provider } from 'react-redux'
import { store } from './store/index'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <NextUIProvider>
                <NextThemesProvider
                    attribute='class'
                    defaultTheme='light'
                    themes={['light', 'dark']}
                >
                    <App />
                </NextThemesProvider>
            </NextUIProvider>
        </Provider>
    </React.StrictMode>,
)
