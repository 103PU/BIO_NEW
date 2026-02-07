'use client'

import styled from 'styled-components'

export const Heading = styled.h2<{ $size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl', $weight?: string }>`
  font-family: var(--font-newsreader), serif;
  font-weight: ${p => p.$weight || 600};
  line-height: 1.1;
  color: hsl(var(--color-text));
  
  font-size: ${p => {
        switch (p.$size) {
            case 'sm': return 'var(--font-sm)';
            case 'md': return 'var(--font-md)';
            case 'lg': return 'var(--font-lg)';
            case 'xl': return 'var(--font-xl)';
            case '2xl': return 'var(--font-2xl)';
            case '3xl': return 'var(--font-3xl)';
            default: return 'var(--font-xl)';
        }
    }};
`

export const Text = styled.p<{ $size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl', $variant?: 'default' | 'subtle' | 'muted' }>`
  font-family: var(--font-inter), sans-serif;
  line-height: 1.6;
  
  color: ${p => {
        switch (p.$variant) {
            case 'subtle': return 'hsl(var(--color-text-subtle))';
            case 'muted': return 'hsl(var(--color-text-muted))';
            default: return 'hsl(var(--color-text))';
        }
    }};

  font-size: ${p => {
        switch (p.$size) {
            case 'xs': return 'var(--font-xs)';
            case 'md': return 'var(--font-md)'; // 18-20px
            case 'lg': return 'var(--font-lg)';
            case 'xl': return 'var(--font-xl)';
            default: return 'var(--font-sm)'; // 16px
        }
    }};
`

export const Label = styled.span<{ $size?: 'xs' | 'sm' }>`
  font-family: var(--font-inter), sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: hsl(var(--color-text-subtle));
  
  font-size: ${p => p.$size === 'xs' ? 'var(--font-xs)' : 'var(--font-sm)'};
`
