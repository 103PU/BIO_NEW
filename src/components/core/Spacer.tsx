'use client'

import styled from 'styled-components'

interface SpacerProps {
    axis?: 'horizontal' | 'vertical'
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
}

function getHeight({ axis, size }: SpacerProps) {
    return axis === 'horizontal' ? 1 : `var(--space-${size})`
}

function getWidth({ axis, size }: SpacerProps) {
    return axis === 'vertical' ? 1 : `var(--space-${size})`
}

export const Spacer = styled.span<SpacerProps>`
  display: block;
  width: ${getWidth};
  min-width: ${getWidth};
  height: ${getHeight};
  min-height: ${getHeight};
`

Spacer.defaultProps = {
    axis: 'vertical',
}
