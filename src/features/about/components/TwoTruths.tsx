'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import useSound from 'use-sound'
import { Heading, Text } from '@/components/core/Typography'
import { Button } from '@/components/core/Button'

// Data
const STATEMENTS = [
    { id: '1', text: "I once hiked 500 miles across Spain.", isLie: false },
    { id: '2', text: "I have a pet turtle named 'Speedy'.", isLie: true },
    { id: '3', text: "I deployed my first website in 2015.", isLie: false },
]

const Wrapper = styled.div`
  background: hsl(var(--color-surface));
  border: 4px solid hsl(var(--color-primary));
  border-radius: 12px;
  padding: 32px;
  margin: 48px 0;
  box-shadow: 12px 12px 0px hsl(var(--color-primary) / 0.2);
`

const Options = styled.div`
  display: grid;
  gap: 16px;
  margin-top: 24px;
`

const OptionButton = styled.button<{ $status?: 'default' | 'correct' | 'wrong', $disabled?: boolean }>`
  position: relative;
  display: block;
  width: 100%;
  text-align: left;
  padding: 16px 20px;
  border: 2px solid hsl(var(--color-border));
  border-radius: 8px;
  background: ${p => {
        if (p.$status === 'correct') return 'hsl(140deg 100% 90%)'; // Green-ish
        if (p.$status === 'wrong') return 'hsl(0deg 100% 90%)'; // Red-ish
        return 'hsl(var(--color-background))';
    }};
  color: hsl(var(--color-text));
  font-size: 1.1rem;
  font-weight: 500;
  cursor: ${p => p.$disabled ? 'default' : 'pointer'};
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    ${p => !p.$disabled && `
      transform: translateY(-2px);
      box-shadow: 0 4px 12px hsl(var(--shadow-color) / 0.1);
      border-color: hsl(var(--color-primary));
    `}
  }
`

const Result = styled(motion.div)`
  margin-top: 24px;
  padding: 16px;
  background: hsl(var(--color-background));
  border-radius: 8px;
  border: 1px dashed hsl(var(--color-text-subtle));
`

export const TwoTruths = () => {
    const [played, setPlayed] = useState(false)
    const [result, setResult] = useState<'won' | 'lost' | null>(null)

    // Sounds (Placeholder urls, in real app use local files)
    const [playWin] = useSound('/sounds/win.mp3', { volume: 0.5 });
    const [playLose] = useSound('/sounds/lose.mp3', { volume: 0.5 });

    const handleGuess = (isLie: boolean) => {
        if (played) return
        setPlayed(true)

        if (isLie) {
            setResult('won')
            playWin()
        } else {
            setResult('lost')
            playLose()
        }
    }

    return (
        <Wrapper>
            <Heading $size="xl">Two Truths and a Lie</Heading>
            <Text>Can you verify me? One of these statements is <strong>false</strong>.</Text>

            <Options>
                {STATEMENTS.map((item) => (
                    <OptionButton
                        key={item.id}
                        onClick={() => handleGuess(item.isLie)}
                        $disabled={played}
                        $status={
                            played
                                ? (item.isLie ? 'correct' : (result === 'lost' ? 'wrong' : 'default'))
                                : 'default'
                        }
                    >
                        {item.text}
                    </OptionButton>
                ))}
            </Options>

            <AnimatePresence>
                {played && (
                    <Result
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                    >
                        <Heading $size="md" style={{ color: result === 'won' ? 'green' : 'red' }}>
                            {result === 'won' ? '🎉 Correct!' : '❌ Incorrect!'}
                        </Heading>
                        <Text style={{ marginTop: 8 }}>
                            I actually <strong>do</strong> have a turtle, but his name is "Flash", not "Speedy".
                            Also, I walked 500 miles across Spain (The Camino de Santiago) in 2018!
                        </Text>
                        <div style={{ marginTop: 16 }}>
                            <Button onClick={() => window.location.reload()}>Play Again</Button>
                        </div>
                    </Result>
                )}
            </AnimatePresence>
        </Wrapper>
    )
}
