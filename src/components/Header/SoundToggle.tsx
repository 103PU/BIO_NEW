'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { animated } from '@react-spring/web';
import useBoop from '@/hooks/useBoop';
import styled from 'styled-components';
import { useSoundContext } from '@/components/core/SoundProvider';

// Explicitly cast to any to resolve Type mismatch between styled-components v6 and @types/styled-components v5
const IconButton: any = styled(animated.button)`
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
  const { soundEnabled, toggleSound } = useSoundContext();
  const [style, trigger] = useBoop({ x: 2, timing: 200 });

  const isMuted = !soundEnabled;

  return (
    <IconButton
      style={style as any}
      onMouseEnter={trigger}
      onClick={toggleSound}
      aria-label={isMuted ? "Unmute" : "Mute"}
      type="button"
    >
      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </IconButton>
  );
};
