'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { animated } from '@react-spring/web';
import useBoop from '@/hooks/useBoop';
import styled from 'styled-components';
import { useSoundContext } from '@/components/core/SoundProvider';

const IconButton = styled(animated.button)`
  background: transparent;
  border: none;
  cursor: pointer;
  color: hsl(var(--color-text));
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 200ms ease;

  &:hover {
    background: hsl(var(--color-surface));
    color: hsl(var(--color-primary));
  }
`;

export const SoundToggle = () => {
    const { isMuted, toggleSound } = useSoundContext();
    const [style, trigger] = useBoop({ x: 2, timing: 200 }); // Shake effect logic would be more complex, simplify for now

    // Placeholder shake animation:
    // Ideally use keyframes or complex spring config.
    // Here we use a simple translation.

    return (
        <IconButton
            style={style}
            onMouseEnter={trigger}
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute" : "Mute"}
        >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </IconButton>
    );
};
