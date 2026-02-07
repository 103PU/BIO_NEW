'use client'

import styled from 'styled-components'
import { useTheme } from './ThemeProvider'
import { Moon, Sun } from 'lucide-react'

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  padding: 0.5rem;
  
  &:hover {
    color: var(--color-primary);
  }
`

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <Button onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </Button>
    )
}
