'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { COLORS } from '@/styles/theme';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
    theme: Theme;
    toggleTheme: () => void;
}>({
    theme: 'light',
    toggleTheme: () => { },
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light')

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme') as Theme
        if (localTheme) {
            setTheme(localTheme)
            document.documentElement.dataset.theme = localTheme
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark')
            document.documentElement.dataset.theme = 'dark'
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        window.localStorage.setItem('theme', newTheme)
        document.documentElement.dataset.theme = newTheme
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
