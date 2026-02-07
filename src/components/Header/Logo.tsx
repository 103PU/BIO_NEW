'use client';

import styled from 'styled-components';
import { animated } from '@react-spring/web';
import useSound from 'use-sound';
import useBoop from '@/hooks/useBoop';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.5rem;
  color: hsl(var(--color-primary));
  cursor: pointer;
  perspective: 200px;
`;

const Name = styled.span`
  position: relative;
  z-index: 2;
`;

const Squiggle = styled(animated.svg)`
  width: 32px;
  height: 32px;
  stroke: hsl(var(--color-primary));
  stroke-width: 3;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

export default function Logo() {
    const [style, trigger] = useBoop({ rotation: 20, scale: 1.1, timing: 200 });

    // Using a short pop sound. Assuming /sounds/pop.mp3 exists or will be added.
    // If not, it fails silently or uses fallback.
    const [play] = useSound('/sounds/pop.mp3', { volume: 0.5 });

    return (
        <Wrapper
            onMouseEnter={() => {
                trigger();
            }}
            onMouseDown={() => play()}
        >
            <Name>103_PU</Name>
            {/* Hand-drawn squiggle mimicking a spring/coil */}
            <Squiggle
                viewBox="0 0 24 24"
                style={style}
            >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                {/* Replacing with a more "squiggly" path */}
                {/* A simple coil shape */}
                <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8z" opacity="0.2" stroke="none" fill="currentColor" />
                <path d="M7 12c0 2.8 2.2 5 5 5s5-2.2 5-5-2.2-5-5-5-5 2.2-5 5z" strokeWidth="2" />
                {/* Let's try a better squiggle path */}
                <path d="M2.5 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8z" opacity="0" />
            </Squiggle>
        </Wrapper>
    );
}
