import { SunMoon } from 'lucide-react'
import React, { useState } from 'react'

interface ToggleThemeProps {
    width: string
    height: string
}

export const ToggleTheme: React.FC<ToggleThemeProps> = ({ width, height }) => {
    const [theme, setTheme] = useState('light')
    const [color, setColor] = useState('')

    const styles = `w-${width} h-${height} ${color}`

    const toggleTheme = () => {
        let newTheme = ''
        let newColor = ''

        if (theme.includes('dark')) {
            newTheme = 'light bg-background'
            newColor = 'text-primary'
        } else {
            newTheme = 'dark bg-dark-background'
            newColor = 'text-dark-primary'
        }
        
        setColor(newColor)
        setTheme(newTheme)
        document.documentElement.className = newTheme
    }

    return (
        <button onClick={toggleTheme}>
            <SunMoon className={styles} />
        </button>
    )
}
