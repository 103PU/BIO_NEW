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
            {/* Hand-drawn squiggle mimicking a spring/coil */}
            <Squiggle
                viewBox="0 0 24 24"
                style={style as any}
            >
                {/* A proper spring/coil path */}
                <path
                    d="M2 12C2 12 5 5 8 5C11 5 11 19 14 19C17 19 17 5 20 5C23 5 22 12 22 12"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                />
            </Squiggle>
        </Wrapper>
    );
}
