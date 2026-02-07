'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface BentoCardProps {
    children: ReactNode
    area?: string
    className?: string
    href?: string
}

const Wrapper = styled(motion.div) <{ $area?: string }>`
  grid-area: ${p => p.$area || 'auto'};
  position: relative;
  overflow: hidden;
  background: hsl(var(--color-surface));
  border: 1px solid hsl(var(--color-border));
  border-radius: 16px;
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  transition: border-color 0.3s ease;
  
  /* Glassmorphism hint */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 1px hsl(var(--color-surface) / 0.5);
    border-radius: 16px;
    pointer-events: none;
    z-index: 2;
  }

  &:hover {
    border-color: hsl(var(--color-primary) / 0.3);
    z-index: 10; /* Bring to front on hover */
  }
`

const ClickOverlay = styled.a`
  position: absolute;
  inset: 0;
  z-index: 20;
  cursor: pointer;
`

export const BentoCard = ({ children, area, className, href }: BentoCardProps) => {
    return (
        <Wrapper
            $area={area}
            className={className}
            whileHover={{
                y: -4,
                boxShadow: "var(--shadow-lg)",
            }}
            initial={{ boxShadow: "var(--shadow-sm)" }}
        >
            {children}
            {href && <ClickOverlay href={href} aria-label="Go to link" />}
        </Wrapper>
    )
}
