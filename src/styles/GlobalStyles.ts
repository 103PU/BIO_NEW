import { createGlobalStyle } from 'styled-components';
import { COLORS, QUERIES } from './theme';

const GlobalStyles = createGlobalStyle`
  /* CSS Variables */
  :root {
    --color-background: ${COLORS.light.background};
    --color-surface: ${COLORS.light.surface};
    --color-text: ${COLORS.light.text};
    --color-text-muted: ${COLORS.light.textMuted};
    --color-primary: ${COLORS.light.primary};
    --color-secondary: ${COLORS.light.secondary};
    --color-accent: ${COLORS.light.accent};
    --color-border: ${COLORS.light.border};
    
    /* Fluid Typography (Utopia.fyi) */
    --font-size-xs: clamp(0.75rem, 0.70rem + 0.25vw, 0.875rem);
    --font-size-sm: clamp(0.875rem, 0.83rem + 0.23vw, 1rem);
    --font-size-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
    --font-size-lg: clamp(1.125rem, 1.08rem + 0.23vw, 1.25rem);
    --font-size-xl: clamp(1.25rem, 1.20rem + 0.25vw, 1.5rem);
    --font-size-2xl: clamp(1.5rem, 1.41rem + 0.45vw, 1.875rem);
    --font-size-3xl: clamp(1.875rem, 1.76rem + 0.57vw, 2.25rem);
    
    /* Spacing */
    --space-xs: clamp(0.5rem, 0.46rem + 0.21vw, 0.75rem);
    --space-sm: clamp(0.75rem, 0.69rem + 0.32vw, 1.125rem);
    --space-md: clamp(1rem, 0.92rem + 0.43vw, 1.5rem);
    --space-lg: clamp(1.5rem, 1.38rem + 0.64vw, 2.25rem);
    --space-xl: clamp(2.25rem, 2.07rem + 0.96vw, 3.375rem);

    &[data-theme='dark'] {
      --color-background: ${COLORS.dark.background};
      --color-surface: ${COLORS.dark.surface};
      --color-text: ${COLORS.dark.text};
      --color-text-muted: ${COLORS.dark.textMuted};
      --color-primary: ${COLORS.dark.primary};
      --color-secondary: ${COLORS.dark.secondary};
      --color-accent: ${COLORS.dark.accent};
      --color-border: ${COLORS.dark.border};
    }

    /* Layered Shadows (Phase 2) */
    --shadow-color: 220deg 3% 15%;
    --shadow-strength: 1%;

    --shadow-sm: 
      0px 0.5px 0.6px hsl(var(--shadow-color) / var(--shadow-strength)),
      0px 1.5px 1.8px -0.8px hsl(var(--shadow-color) / var(--shadow-strength)),
      0px 3.5px 4.2px -1.7px hsl(var(--shadow-color) / var(--shadow-strength));
      
    --shadow-md:
      0px 0.8px 1px hsl(var(--shadow-color) / var(--shadow-strength)),
      0px 2.8px 3.4px -0.6px hsl(var(--shadow-color) / var(--shadow-strength)),
      0px 6.7px 8.1px -1.2px hsl(var(--shadow-color) / var(--shadow-strength));

    --shadow-lg:
      0px 0.8px 1px hsl(var(--shadow-color) / var(--shadow-strength)),
      0px 2.8px 3.4px -0.6px hsl(var(--shadow-color) / var(--shadow-strength)),
      0px 6.7px 8.1px -1.2px hsl(var(--shadow-color) / var(--shadow-strength)),
      0px 16.2px 19.6px -1.8px hsl(var(--shadow-color) / var(--shadow-strength)),
      0px 35px 40px -2.5px hsl(var(--shadow-color) / var(--shadow-strength));

    &[data-theme='light'] {
      --shadow-strength: 10%;
      --shadow-color: 220deg 3% 15%;
    }
    
    &[data-theme='dark'] {
      --shadow-strength: 25%;
      --shadow-color: 0deg 0% 0%;
    }
  }

  /* Reset */
  *, *::before, *::after {
    box_sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: hsl(var(--color-background));
    color: hsl(var(--color-text));
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    transition: background-color 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), color 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  /* Noise Texture */
  body::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    mix-blend-mode: overlay;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-newsreader), serif;
    font-weight: 600;
    line-height: 1.1;
    color: hsl(var(--color-text));
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  button {
    font-family: inherit;
  }

  /* Module C: Custom Selection */
  ::selection {
    background-color: hsl(var(--color-primary));
    color: hsl(var(--color-background));
  }

  /* Module A: Custom Focus Ring */
  :focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px hsl(var(--color-background)), 0 0 0 5px hsl(var(--color-primary));
    border-radius: 4px;
  }
`;

export default GlobalStyles;
