'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Hamburger Button (SVG)
const HamburgerButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 10001; /* Above drawer */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 32px;
  height: 32px;
`;

const Line = styled(motion.span)`
  width: 100%;
  height: 2px;
  background: hsl(var(--color-text));
  border-radius: 2px;
  transform-origin: center;
`;

// Drawer (Overlay)
const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: hsl(var(--color-background) / 0.8);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  justify-content: flex-end;
`;

const DrawerContent = styled(motion.div)`
  width: 300px;
  height: 100%;
  background: hsl(var(--color-surface));
  padding: 80px 32px;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const DrawerLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: hsl(var(--color-text));
  text-decoration: none;
  
  &:hover {
    color: hsl(var(--color-primary));
  }
`;

export default function MobileNavigation() {
    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll when open (optional)

    return (
        <>
            <HamburgerButton onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
                <Line
                    animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                />
                <Line
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <Line
                    animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                />
            </HamburgerButton>

            <AnimatePresence>
                {isOpen && (
                    <Overlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    >
                        <DrawerContent
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <DrawerLink href="/blog" onClick={() => setIsOpen(false)}>Blog</DrawerLink>
                            <DrawerLink href="/projects" onClick={() => setIsOpen(false)}>Projects</DrawerLink>
                            <DrawerLink href="/guestbook" onClick={() => setIsOpen(false)}>Guestbook</DrawerLink>
                            <DrawerLink href="/about" onClick={() => setIsOpen(false)}>About</DrawerLink>
                        </DrawerContent>
                    </Overlay>
                )}
            </AnimatePresence>
        </>
    );
}
