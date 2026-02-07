'use client'

import styled from 'styled-components'
import { motion, HTMLMotionProps } from 'framer-motion'
// import useSound from 'use-sound'
import { cloneElement, forwardRef } from 'react'

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    href?: string
}

const BaseButton = styled(motion.button) <{ $variant?: string; $size?: string }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-family: var(--font-inter);
  transition: background-color 0.2s, color 0.2s;
  
  /* Sizes */
  padding: ${p => p.$size === 'sm' ? '8px 16px' : p.$size === 'lg' ? '16px 32px' : '12px 24px'};
  font-size: ${p => p.$size === 'sm' ? '0.875rem' : p.$size === 'lg' ? '1.125rem' : '1rem'};

  /* Variants */
  ${p => p.$variant === 'primary' && `
    background: hsl(var(--color-primary));
    color: white;
    box-shadow: 0px 4px 12px hsl(var(--color-primary) / 0.3);
    
    &:hover {
      background: hsl(var(--color-primary) / 0.9);
    }
  `}

  ${p => p.$variant === 'secondary' && `
    background: hsl(var(--color-surface));
    color: hsl(var(--color-text));
    border: 1px solid hsl(var(--color-border));
    
    &:hover {
      background: hsl(var(--color-secondary) / 0.2);
    }
  `}

  ${p => p.$variant === 'ghost' && `
    background: transparent;
    color: hsl(var(--color-text-muted));
    
    &:hover {
      background: hsl(var(--color-surface));
      color: hsl(var(--color-text));
    }
  `}
`

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    children, variant = 'primary', size = 'md', ...props
}, ref) => {
    // const [playClick] = useSound('/sounds/click.mp3') // Restoration TODO
    // const [playHover] = useSound('/sounds/hover.mp3')

    return (
        <BaseButton
            ref={ref}
            $variant={variant}
            $size={size}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0, scale: 0.98 }}
            {...props}
        >
            {children}
        </BaseButton>
    )
})

Button.displayName = 'Button'
