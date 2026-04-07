export const BREAKPOINTS = {
    mobile: 600,
    tablet: 950,
    laptop: 1300,
    desktop: 1301, // Standard desktop start
} as const;

export const QUERIES = {
    mobileAndDown: `(max-width: ${BREAKPOINTS.mobile}px)`,
    tabletAndDown: `(max-width: ${BREAKPOINTS.tablet}px)`,
    laptopAndDown: `(max-width: ${BREAKPOINTS.laptop}px)`,
    desktopAndUp: `(min-width: ${BREAKPOINTS.desktop}px)`,
};
