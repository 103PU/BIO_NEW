'use client'

import styled from 'styled-components'

const Wrapper = styled.footer`
  padding: 2rem;
  text-align: center;
  color: var(--color-muted);
  font-size: 0.875rem;
`

export const Footer = () => {
    return (
        <Wrapper>
            © {new Date().getFullYear()} 103_PU. All rights reserved.
        </Wrapper>
    )
}
