'use client'

import styled from 'styled-components'
import Link from 'next/link'

const Wrapper = styled(Link)`
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-text);
  font-family: var(--font-newsreader);
  
  span {
    color: var(--color-primary);
  }
`

export const Logo = () => {
    return (
        <Wrapper href="/">
            103_<span>PU</span>
        </Wrapper>
    )
}
