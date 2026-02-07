'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Logo } from './Logo'
import { MagicLink } from './MagicLink'

const Wrapper = styled.footer`
  padding: var(--space-3xl) var(--space-md) var(--space-xl);
  margin-top: var(--space-3xl);
  border-top: 1px solid hsl(var(--color-border));
  background: hsl(var(--color-surface) / 0.3);
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl);
  max-width: 1100px;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
`

const BrandColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`

const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  
  h4 {
    font-size: var(--font-sm);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: hsl(var(--color-text-subtle));
    margin-bottom: var(--space-xs);
  }
`

const SocialLink = styled(motion.a)`
  display: block;
  color: hsl(var(--color-text-muted));
  transition: color 0.2s;
  cursor: pointer;
  
  &:hover {
    color: hsl(var(--color-primary));
  }
`

export const Footer = () => {
    return (
        <Wrapper>
            <Grid>
                <BrandColumn>
                    <div style={{ transform: 'scale(0.8)', transformOrigin: 'top left' }}>
                        <Logo />
                    </div>
                    <p style={{ color: 'hsl(var(--color-text-muted))', maxWidth: '30ch' }}>
                        Designing for the web of tomorrow. built with sweat, tears, and a lot of coffee.
                    </p>
                    <p style={{ fontSize: 'var(--font-xs)', color: 'hsl(var(--color-text-subtle))' }}>
                        © {new Date().getFullYear()} 103_PU.
                    </p>
                </BrandColumn>

                <LinkColumn>
                    <h4>Sitemap</h4>
                    <MagicLink href="/">Home</MagicLink>
                    <MagicLink href="/blog">Blog</MagicLink>
                    <MagicLink href="/projects">Projects</MagicLink>
                    <MagicLink href="/guestbook">Guestbook</MagicLink>
                </LinkColumn>

                <LinkColumn>
                    <h4>Socials</h4>
                    <SocialLink href="https://github.com" whileHover={{ x: 5 }}>GitHub</SocialLink>
                    <SocialLink href="https://twitter.com" whileHover={{ x: 5 }}>Twitter</SocialLink>
                    <SocialLink href="https://linkedin.com" whileHover={{ x: 5 }}>LinkedIn</SocialLink>
                </LinkColumn>

                <LinkColumn>
                    <h4>Legal</h4>
                    <SocialLink href="/privacy" whileHover={{ x: 5 }}>Privacy</SocialLink>
                    <SocialLink href="/terms" whileHover={{ x: 5 }}>Terms</SocialLink>
                </LinkColumn>
            </Grid>
        </Wrapper>
    )
}
