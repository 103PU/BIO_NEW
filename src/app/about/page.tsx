'use client'

import styled from 'styled-components'
import Image from 'next/image'
import { Heading, Text, Label } from '@/components/core/Typography'
import { Spacer } from '@/components/core/Spacer'
import { MagicLink } from '@/components/core/MagicLink'
import { TwoTruths } from '@/features/about/components/TwoTruths'
import { Newsletter } from '@/components/core/Newsletter'

// Standard "Prose" Width
const Container = styled.div`
  max-width: 680px;
  margin: 0 auto;
  padding: 0 var(--space-md);
`

const FullBleed = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: var(--space-2xl) auto;
  
  img {
    border-radius: 12px;
    width: 100%;
    height: auto;
    box-shadow: var(--shadow-lg);
  }
`

const Floater = styled.div`
  @media (min-width: 1100px) {
    float: right;
    width: 300px;
    margin-left: 32px;
    margin-bottom: 32px;
    transform: rotate(3deg);
  }
  
  img {
    border-radius: 12px;
    box-shadow: var(--shadow-md);
    border: 4px solid white;
  }
`

export default function AboutPage() {
    return (
        <div style={{ paddingTop: '120px', paddingBottom: '60px' }}>
            <Container>
                <Heading $size="3xl">About Me</Heading>
                <Spacer size="md" />
                <Text $size="xl" style={{ color: 'hsl(var(--color-primary))', fontWeight: 500 }}>
                    Hello! I'm 103_PU. I'm a software engineer, creative developer, and occasional designer.
                </Text>
                <Spacer size="xl" />

                <Text>
                    I started my coding journey back in 2015, tinkering with HTML and CSS in my dorm room.
                    What started as a curiosity quickly turned into an obsession with building things for the web.
                    <br /><br />
                    These days, I specialize in the <strong>React ecosystem</strong>, helping companies build
                    high-performance web applications that feel alive. I have a particular fondness for
                    <MagicLink href="https://nextjs.org">Next.js</MagicLink> and the new server-side capabilities
                    it unlocks.
                </Text>

                <Spacer size="xl" />
            </Container>

            <FullBleed>
                <div style={{ position: 'relative', height: '400px', background: 'hsl(var(--color-surface))', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Placeholder for real image */}
                    <Label>Working at my Setup (Photo)</Label>
                </div>
            </FullBleed>

            <Container>
                <Heading $size="xl">The Philosophy</Heading>
                <Spacer size="sm" />
                <Floater>
                    <div style={{ width: '100%', height: '250px', background: 'hsl(var(--color-accent))', borderRadius: '12px' }} />
                    <Text $size="xs" $variant="subtle" style={{ textAlign: 'center', marginTop: 8 }}>
                        Me delivering a talk at ReactConf
                    </Text>
                </Floater>
                <Text>
                    I believe that the web honors its roots as a document-sharing platform,
                    but it has evolved into something much more powerful. We are building
                    <strong>applications</strong>, not just pages.
                    <br /><br />
                    My mission is to bridge the gap between "Developer Experience" and "User Experience".
                    Too often, we sacrifice one for the other. I strive to find the sweet spot where
                    code is maintainable and delight is maximized.
                </Text>

                <Spacer size="md" />

                <Text>
                    When I'm not coding, I'm usually:
                </Text>
                <ul style={{ paddingLeft: '24px', margin: '16px 0', lineHeight: 1.6 }}>
                    <li>🏃 Hitting the trails for a long run</li>
                    <li>🎸 Trying to learn complex jazz chords</li>
                    <li>📚 Reading sci-fi novels (Dune is a favorite)</li>
                </ul>

                <TwoTruths />

                <Heading $size="xl">Get in Touch</Heading>
                <Spacer size="sm" />
                <Text>
                    I'm currently <strong>open</strong> for new opportunities and collaborations.
                    If you have a project that needs a creative touch, or just want to say hi,
                    feel free to reach out!
                </Text>
                <Spacer size="md" />
                <MagicLink href="mailto:hello@example.com" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                    hello@103pu.dev
                </MagicLink>
            </Container>

            <div style={{ maxWidth: '800px', margin: '60px auto 0' }}>
                <Newsletter />
            </div>
        </div>
    )
}
