'use client';

import styled from 'styled-components';
import { Search, Rss } from 'lucide-react';
import { animated } from '@react-spring/web';
import useBoop from '@/hooks/useBoop';
import { SoundToggle } from './SoundToggle';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

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

const SearchButton = () => {
    const [style, trigger] = useBoop({ scale: 1.2, timing: 200 });
    return (
        <IconButton
            style={style}
            onMouseEnter={trigger}
            aria-label="Search"
            type="button"
        >
            <Search size={20} />
        </IconButton>
    );
};

const RssButton = () => {
    const [style, trigger] = useBoop({ rotation: 15, timing: 200 });
    return (
        <IconButton
            as="a"
            href="/rss.xml"
            style={style}
            onMouseEnter={trigger}
            aria-label="RSS Feed"
        >
            <Rss size={20} />
        </IconButton>
    );
};

export default function ActionGroup() {
    return (
        <Wrapper>
            <SearchButton />
            <SoundToggle />
            <RssButton />
        </Wrapper>
    );
}
