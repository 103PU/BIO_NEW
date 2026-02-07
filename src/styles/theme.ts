export const COLORS = {
    light: {
        background: '0, 0%, 100%',     // #ffffff
        surface: '0, 0%, 98%',        // Subtle off-white
        text: '0, 0%, 3.9%',          // Almost black
        textMuted: '0, 0%, 45%',
        primary: '240, 5.9%, 10%',    // Deep charcoal
        secondary: '240, 4.8%, 95.9%',
        accent: '240, 100%, 50%',     // Electric Blue
        border: '240, 5.9%, 90%',
        success: '142, 76%, 36%',
        error: '0, 84%, 60%',
        ring: '240, 5%, 64.9%',
    },
    dark: {
        background: '0, 0%, 3.9%',    // #0a0a0a
        surface: '0, 0%, 7%',         // Slightly lighter dark
        text: '0, 0%, 98%',
        textMuted: '240, 5%, 64.9%',
        primary: '0, 0%, 98%',
        secondary: '240, 3.7%, 15.9%',
        accent: '240, 100%, 60%',     // Lighter Electric Blue
        border: '240, 3.7%, 15.9%',
        success: '142, 70%, 50%',
        error: '0, 62%, 30%',
        ring: '240, 4.9%, 83.9%',
    }
} as const;

export const BREAKPOINTS = {
    tablet: 768,
    laptop: 1024,
    desktop: 1280,
} as const;

export const QUERIES = {
    tabletAndUp: `(min-width: ${BREAKPOINTS.tablet}px)`,
    laptopAndUp: `(min-width: ${BREAKPOINTS.laptop}px)`,
    desktopAndUp: `(min-width: ${BREAKPOINTS.desktop}px)`,
};
