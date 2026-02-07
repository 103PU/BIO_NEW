import type { Metadata } from 'next'
import { Inter, Newsreader } from 'next/font/google'
import StyledComponentsRegistry from './registry'
import GlobalStyles from '@/styles/GlobalStyles'
import { ThemeScript } from '@/lib/theme-script'
import { Header } from '@/components/core/Header'
import { Footer } from '@/components/core/Footer'
import { ThemeProvider } from '@/components/core/ThemeProvider'
import { SoundProvider } from '@/components/core/SoundProvider'
import { ScrollProgress } from '@/components/core/ScrollProgress'
import { SkipLink } from '@/components/core/SkipLink'
import { AuthProvider } from '@/components/core/AuthProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-newsreader', style: 'italic' })

export const metadata: Metadata = {
    title: '103_PU | Portfolio',
    description: 'Personal Portfolio of 103_PU',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <ThemeScript />
            </head>
            <body className={`${inter.variable} ${newsreader.variable}`}>
                <StyledComponentsRegistry>
                    <AuthProvider>
                        <ThemeProvider>
                            <SoundProvider>
                                <GlobalStyles />
                                <ScrollProgress />
                                <SkipLink />
                                <Header />
                                <main id="main-content">{children}</main>
                                <Footer />
                            </SoundProvider>
                        </ThemeProvider>
                    </AuthProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    )
}
