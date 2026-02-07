'use client'

import styled from 'styled-components'

export const MaxWidthWrapper = styled.div`
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-md);
  padding-right: var(--space-md);
  width: 100%;
  
  @media (min-width: 1400px) {
    max-width: 1250px;
  }
`

export const FullBleedWrapper = styled.div`
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  
  /* Inner content usually needs to be constrained back to MaxWidth */
  & > * {
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--space-md);
    padding-right: var(--space-md);
  }
`
