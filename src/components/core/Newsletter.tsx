'use client'

import styled from 'styled-components'
import { Button } from './Button'
import { Heading, Text } from './Typography'

const Wrapper = styled.section`
  background: hsl(var(--color-surface));
  border: 1px solid hsl(var(--color-border));
  border-radius: 24px;
  padding: var(--space-2xl);
  text-align: center;
  max-width: 800px;
  margin: var(--space-3xl) auto;
  position: relative;
  overflow: hidden;

  /* Decor */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, hsl(var(--color-primary)), hsl(var(--color-accent)));
  }
`

const Form = styled.form`
  display: flex;
  gap: var(--space-sm);
  max-width: 400px;
  margin: var(--space-lg) auto 0;
  flex-direction: column;
  
  @media (min-width: 600px) {
    flex-direction: row;
  }
`

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid hsl(var(--color-border));
  background: hsl(var(--color-background));
  color: hsl(var(--color-text));
  font-size: var(--font-md);
  
  &:focus {
    outline: 2px solid hsl(var(--color-primary));
    border-color: transparent;
  }
`

export const Newsletter = () => {
    return (
        <Wrapper>
            <Heading $size="xl">Join the journey</Heading>
            <Text $variant="muted" style={{ marginTop: '8px' }}>
                Get snippets, tutorials, and weird experiments delivered to your inbox.
                No spam, just vibes.
            </Text>

            <Form onSubmit={(e) => e.preventDefault()}>
                <Input placeholder="your@email.com" type="email" required />
                <Button>Subscribe</Button>
            </Form>
        </Wrapper>
    )
}
