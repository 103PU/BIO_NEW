'use client'

import styled from 'styled-components'
import { Card } from '@/components/core/Card'
import { Guestbook } from '@/features/guestbook/components/Guestbook'
import { ViewCounter } from '@/components/core/ViewCounter'
import { MagicLink } from '@/components/core/MagicLink'
import { Button } from '@/components/core/Button'

// Bento Grid Layout
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  padding: 120px 24px 60px; /* Top padding for fixed header */
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, minmax(180px, auto));
  }
`

// Grid Areas
const HeroCard = styled(Card)`
  grid-column: 1 / -1;
  grid-row: 1 / 3;
  
  @media (min-width: 1024px) {
    grid-column: 1 / 3;
  }
  
  h1 {
    font-size: var(--font-size-3xl);
    background: linear-gradient(135deg, hsl(var(--color-text)) 0%, hsl(var(--color-text-muted)) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: var(--font-size-lg);
    color: hsl(var(--color-text-muted));
    line-height: 1.6;
    max-width: 50ch;
  }
`

const StatsCard = styled(Card)`
  grid-column: 1 / -1;
  @media (min-width: 768px) { grid-column: span 1; }
`

const GuestbookCard = styled(Card)`
  grid-column: 1 / -1;
  grid-row: span 2;
  
  @media (min-width: 1024px) {
    grid-column: 3 / 5;
    grid-row: 1 / 3;
  }
`

const TechStackCard = styled(Card)`
   grid-column: 1 / -1;
   @media (min-width: 1024px) { grid-column: 1 / 3; }
`

export default function Home() {
    return (
        <Grid>
            {/* Hero Section */}
            <HeroCard>
                <h1>Designing for the <br /> Web of Tomorrow</h1>
                <p>
                    I'm <MagicLink href="/about">103_PU</MagicLink>. I build artisan web experiences
                    with a focus on fluid animations, micro-interactions, and serverless architecture.
                </p>
                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                    <Button>Check my work</Button>
                    <Button variant="secondary">Read Blog</Button>
                </div>
            </HeroCard>

            {/* Guestbook Feature */}
            <GuestbookCard>
                <Guestbook />
            </GuestbookCard>

            {/* Stats */}
            <StatsCard>
                <h3>Total Views</h3>
                <div style={{ fontSize: '3rem', fontWeight: 700, color: 'hsl(var(--color-primary))' }}>
                    <ViewCounter slug="codex" trackView={false} />
                </div>
            </StatsCard>

            <StatsCard>
                <h3>Status</h3>
                <p>🟢 Open for work</p>
                <p>📍 Vietnam</p>
            </StatsCard>

            {/* Tech Stack */}
            <TechStackCard>
                <h3>Technologies</h3>
                <p>Next.js 15 · React 19 · TypeScript · Styled-Components · Supabase · Vercel</p>
            </TechStackCard>

        </Grid>
    )
}
