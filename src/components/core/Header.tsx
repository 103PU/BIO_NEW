'use client'

import styled from 'styled-components'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { Button } from './Button'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

const Wrapper = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 80px;
  z-index: 100;
  backdrop-filter: blur(16px);
  background: hsl(var(--color-surface) / 0.7);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s, background 0.3s;

  &[data-scrolled="true"] {
    background: hsl(var(--color-surface) / 0.85);
    border-bottom: 1px solid hsl(var(--color-border));
  }
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`

export const Header = () => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        return scrollY.on("change", (latest) => {
            setIsScrolled(latest > 50);
        });
    }, [scrollY]);

    return (
        <Wrapper data-scrolled={isScrolled}>
            <Logo />
            <Nav>
                <Button variant="ghost" size="sm">Projects</Button>
                <Button variant="ghost" size="sm">Blog</Button>
                <ThemeToggle />
            </Nav>
        </Wrapper>
    )
}
