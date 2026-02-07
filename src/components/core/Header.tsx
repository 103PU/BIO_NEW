'use client'

import styled from 'styled-components'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.1);
`

export const Header = () => {
    return (
        <Wrapper>
            <Logo />
            <div>
                {/* Navigation placeholder */}
                <ThemeToggle />
            </div>
        </Wrapper>
    )
}
