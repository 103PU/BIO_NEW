'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Card = styled(motion.div)`
  background: hsl(var(--color-surface) / 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid hsl(var(--color-border));
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 0.3s ease;
  
  /* Glassmorphism shine effect */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      115deg,
      transparent 20%,
      hsl(var(--color-text) / 0.03) 25%,
      transparent 30%
    );
    transition: transform 0.5s;
    pointer-events: none;
  }

  &:hover {
    border-color: hsl(var(--color-primary) / 0.3);
    
    &::before {
      transform: translateX(50%);
    }
  }
`
