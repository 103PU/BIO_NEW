import { createGlobalStyle } from 'styled-components';
import { COLORS } from './theme';

const GlobalStyles = createGlobalStyle`
  /* CSS Reset & Variables */
  :root {
    --color-background: ${COLORS.light.background};
    --color-text: ${COLORS.light.text};
    --color-primary: ${COLORS.light.primary};
    --color-secondary: ${COLORS.light.secondary};
    --color-muted: ${COLORS.light.muted};
    --color-border: ${COLORS.light.border};
    
    &[data-theme='dark'] {
      --color-background: ${COLORS.dark.background};
      --color-text: ${COLORS.dark.text};
      --color-primary: ${COLORS.dark.primary};
      --color-secondary: ${COLORS.dark.secondary};
      --color-muted: ${COLORS.dark.muted};
      --color-border: ${COLORS.dark.border};
    }
  }

  *, *::before, *::after {
    box_sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    font-family: var(--font-inter), sans-serif;
    background-color: var(--color-background);
    color: var(--color-text);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyles;
