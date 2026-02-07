'use client';

import styled from 'styled-components';
import Link from 'next/link';

const NavList = styled.ul`
  display: flex;
  gap: var(--space-md);
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  position: relative;
`;

const StyledLink = styled(Link)`
  position: relative;
  color: hsl(var(--color-text-muted));
  font-weight: 600;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  transition: color 200ms ease;
  isolation: isolate;

  &:hover {
    color: hsl(var(--color-primary));
  }

  /* The "Pill" Hover Effect */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: hsl(var(--color-primary) / 0.15);
    border-radius: 8px;
    z-index: -1;
    transform: scale(0.9);
    opacity: 0;
    transition: transform 200ms ease, opacity 200ms ease;
  }

  &:hover::before {
    transform: scale(1);
    opacity: 1;
  }
`;

export default function DesktopNavigation() {
    return (
        <NavList>
            <NavItem><StyledLink href="/blog">Blog</StyledLink></NavItem>
            <NavItem><StyledLink href="/projects">Projects</StyledLink></NavItem>
            <NavItem><StyledLink href="/guestbook">Guestbook</StyledLink></NavItem>
            <NavItem><StyledLink href="/about">About</StyledLink></NavItem>
        </NavList>
    );
}
