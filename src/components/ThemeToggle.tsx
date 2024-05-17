import { SunMoon } from 'lucide-react'
import React, { useState } from 'react'

interface ToggleThemeProps {
    classIcon?: string,
    title?: string,
    classBtn?: string
}

export const ToggleTheme: React.FC<ToggleThemeProps> = ({ classIcon, title, classBtn }) => {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        let newTheme = ''

        if (theme.includes('dark')) {
            newTheme = 'light bg-background'
        } else {
            newTheme = 'dark bg-dark-background'
        }
        
        setTheme(newTheme)
        document.documentElement.className = newTheme
    }

    return (
        <button onClick={toggleTheme} className={ classBtn }>
            <SunMoon className={ classIcon } />
            { title }
        </button>
    )
}
