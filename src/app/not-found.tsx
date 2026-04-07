'use client'

import styled from 'styled-components'
import { Button } from '@/components/core/Button'
import { Heading, Text } from '@/components/core/Typography'
import { MagicLink } from '@/components/core/MagicLink'
import { Spacer } from '@/components/core/Spacer'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  position: relative;
  overflow: hidden;
`

const GlitchText = styled(Heading)`
  font-size: 8rem;
  font-weight: 900;
  color: hsl(var(--color-primary));
  opacity: 0.8;
  letter-spacing: -0.05em;
  
  @keyframes noise {
    0% { transform: translate(0,0) }
    20% { transform: translate(-2px,2px) }
    40% { transform: translate(-2px,-2px) }
    60% { transform: translate(2px,2px) }
    80% { transform: translate(2px,-2px) }
    100% { transform: translate(0,0) }
  }
  
  animation: noise 2s infinite linear alternate-reverse;
`

export default function NotFound() {
    return (
        <Wrapper>
            <GlitchText as="h1">404</GlitchText>
            <Heading $size="2xl">Page Not Found</Heading>
            <Spacer size="md" />
            <Text $size="lg" $variant="muted" style={{ maxWidth: '30ch' }}>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </Text>
            <Spacer size="xl" />
            <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                <MagicLink href="/">
                    <Button>Return Home</Button>
                </MagicLink>
            </div>
        </Wrapper>
    )
}
