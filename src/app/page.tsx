'use client'

import styled from 'styled-components'
import { BentoCard } from '@/components/core/BentoCard'
import { Guestbook } from '@/features/guestbook/components/Guestbook'
import { ViewCounter } from '@/components/core/ViewCounter'
import { MagicLink } from '@/components/core/MagicLink'
import { Button } from '@/components/core/Button'
import { Heading, Text, Label } from '@/components/core/Typography'
import { Spacer } from '@/components/core/Spacer'

// Phase 3: Bento Grid Engine
const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-3xl) var(--space-md) var(--space-2xl);
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "bio      bio"
      "latest   latest"
      "project1 project2"
      "guestbook guestbook"
      "social   stats";
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "bio      bio      latest   latest"
      "project1 project2 latest   latest"
      "guestbook guestbook social   stats";
  }
`

export default function Home() {
  return (
    <Grid>
      {/* Bio Area */}
      <BentoCard area="bio">
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
          <Label>Welcome</Label>
          <Spacer size="xs" />
          <Heading $size="2xl">Designing for the <br /> Web of Tomorrow</Heading>
          <Spacer size="md" />
          <Text $size="lg" $variant="subtle">
            I'm <MagicLink href="/about">103_PU</MagicLink>. I build artisan web experiences
            with a focus on fluid animations and serverless architecture.
          </Text>
          <Spacer size="lg" />
          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            <Button>Check my work</Button>
            <Button variant="secondary">Read Blog</Button>
          </div>
        </div>
      </BentoCard>

      {/* Latest Work (Placeholder) */}
      <BentoCard area="latest" href="/blog/hello-world">
        <div style={{ height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <Label>Latest Post</Label>
          <Heading $size="xl">The Future of React Server Components</Heading>
          <Text $variant="subtle">How zero-bundle-size is changing the game.</Text>
        </div>
      </BentoCard>

      {/* Projects */}
      <BentoCard area="project1" href="#">
        <Label>Project</Label>
        <Heading $size="md">Vitechco Hub</Heading>
        <Text $size="sm" $variant="muted">Next.js 15 Enterprise Platform</Text>
      </BentoCard>

      <BentoCard area="project2" href="#">
        <Label>Project</Label>
        <Heading $size="md">Artisan Portfolio</Heading>
        <Text $size="sm" $variant="muted">Josh W. Comeau Clone</Text>
      </BentoCard>

      {/* Guestbook */}
      <BentoCard area="guestbook">
        <Label>Community</Label>
        <Spacer size="xs" />
        <Guestbook />
      </BentoCard>

      {/* Socials */}
      <BentoCard area="social">
        <Label>Connect</Label>
        <Spacer size="sm" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <MagicLink href="https://github.com">GitHub ↗</MagicLink>
          <MagicLink href="https://twitter.com">Twitter ↗</MagicLink>
          <MagicLink href="mailto:hello@example.com">Email ↗</MagicLink>
        </div>
      </BentoCard>

      {/* Stats */}
      <BentoCard area="stats">
        <Label>Analytics</Label>
        <Spacer size="sm" />
        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'hsl(var(--color-primary))' }}>
          <ViewCounter slug="codex" trackView={false} />
        </div>
        <Text $size="xs" $variant="muted">Total Page Views</Text>
      </BentoCard>

    </Grid>
  )
}
