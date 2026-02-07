'use client'

import React, { createContext, useContext, useState } from 'react'
// import useSound from 'use-sound'

const SoundContext = createContext<{
    soundEnabled: boolean;
    toggleSound: () => void;
    playClick: () => void;
    playHover: () => void;
}>({
    soundEnabled: true,
    toggleSound: () => { },
    playClick: () => { },
    playHover: () => { },
})

export const useSoundContext = () => useContext(SoundContext)

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
    const [soundEnabled, setSoundEnabled] = useState(true)

    // Placeholder functions until sound files are restored
    const playClick = () => { if (soundEnabled) console.log('Click'); }
    const playHover = () => { if (soundEnabled) console.log('Hover'); }

    const toggleSound = () => setSoundEnabled(prev => !prev)

    return (
        <SoundContext.Provider value={{ soundEnabled, toggleSound, playClick, playHover }}>
            {children}
        </SoundContext.Provider>
    )
}
