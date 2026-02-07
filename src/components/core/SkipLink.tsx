'use client'

import styled from 'styled-components'

const Link = styled.a`
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 12px 24px;
  background: hsl(var(--color-primary));
  color: hsl(var(--color-background));
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
  z-index: 99999;
  transform: translateY(-200%);
  transition: transform 0.2s ease;
  
  &:focus {
    transform: translateY(0);
    outline: none;
    box-shadow: 0 0 0 4px hsl(var(--color-background)), 0 0 0 6px hsl(var(--color-primary));
  }
`

export const SkipLink = () => {
    return (
        <Link href="#main-content">Skip to content</Link>
    )
}
