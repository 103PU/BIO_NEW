'use client'

import styled from 'styled-components'

export const Tag = styled.span<{ $variant?: 'default' | 'outline' }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: var(--font-inter);
  font-size: var(--font-xs);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  ${p => p.$variant === 'outline' ? `
    border: 1px solid hsl(var(--color-primary));
    color: hsl(var(--color-primary));
  ` : `
    background: hsl(var(--color-primary) / 0.1);
    color: hsl(var(--color-primary));
  `}
  
  &:hover {
    background: hsl(var(--color-primary) / 0.2);
  }
`
