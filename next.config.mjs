/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
            },
            {
                protocol: 'https',
                hostname: 'p16-sign-sg.tiktokcdn.com',
            },
        ],
    },
    // Fix for Velite (ESM module)
    webpack: (config) => {
        config.infrastructureLogging = {
            level: 'error',
        };
        return config;
    },
    // Fix for Next.js 15 Turbopack build error
    turbopack: {},
};

export default nextConfig;
