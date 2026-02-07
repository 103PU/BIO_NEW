'use client';

import styled from 'styled-components';
import Logo from './Logo';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import ActionGroup from './ActionGroup';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  padding: 0 var(--space-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 9999;
  
  /* Glassmorphism */
  background: hsl(var(--color-background) / 0.8);
  backdrop-filter: blur(12px) saturate(180%);
  border-bottom: 1px solid hsl(var(--color-border) / 0.5);
  transition: background 500ms ease, height 500ms ease;

  @media (max-width: 768px) {
    height: 60px;
  }
`;

const DesktopOnly = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`;

const MobileOnly = styled.div`
  display: block;
  @media (min-width: 768px) {
    display: none;
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-md);
`;

export default function HeaderIndex() {
    return (
        <HeaderWrapper>
            <Logo />

            <DesktopOnly>
                <DesktopNavigation />
            </DesktopOnly>

            <RightSide>
                <DesktopOnly>
                    <ActionGroup />
                </DesktopOnly>
                <MobileOnly>
                    {/* Minimal actions on mobile or integrate into drawer */}
                    <SoundToggleOnly />
                </MobileOnly>
                <MobileOnly>
                    <MobileNavigation />
                </MobileOnly>
            </RightSide>
        </HeaderWrapper>
    );
}

// Temporary internal component for mobile sound toggle if needed separately
// But ideally ActionGroup should be responsive. For now, simplifying layout.
import { SoundToggle } from './SoundToggle';
const SoundToggleOnly = () => (
    <div style={{ marginRight: 8 }}>
        <SoundToggle />
    </div>
);
