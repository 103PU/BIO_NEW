'use client'

import styled from 'styled-components'
import Link from 'next/link'

const Wrapper = styled(Link)`
  color: hsl(var(--color-primary));
  font-weight: 500;
  text-decoration: none;
  background-image: linear-gradient(hsl(var(--color-primary)), hsl(var(--color-primary)));
  background-position: 0% 100%;
  background-repeat: no-repeat;
  background-size: 0% 2px;
  transition: background-size 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  
  &:hover {
    background-size: 100% 2px;
  }
`

export const MagicLink = ({ href, children, ...props }: React.ComponentProps<typeof Link>) => {
    return (
        <Wrapper href={href} {...(props as any)}>
            {children}
        </Wrapper>
    )
}
