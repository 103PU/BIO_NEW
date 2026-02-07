'use client'

import { useState } from 'react'
import { useGuestbook } from '../hooks/useGuestbook'
import { useSession, signIn, signOut } from 'next-auth/react'
import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
`

const Form = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
`

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-background);
  color: var(--color-text);
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

export const Guestbook = () => {
    const { entries, mutate, isLoading } = useGuestbook()
    const { data: session } = useSession()
    const [input, setInput] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || !session) return

        const newEntry = {
            id: Date.now().toString(),
            body: input,
            createdBy: session.user?.name || 'Anonymous',
            updatedAt: new Date().toISOString(),
        }

        try {
            await mutate(
                async (currentData) => {
                    await fetch('/api/guestbook', {
                        method: 'POST',
                        body: JSON.stringify({ body: input }),
                        headers: { 'Content-Type': 'application/json' },
                    })
                    return [newEntry, ...(currentData || [])]
                },
                {
                    optimisticData: (currentData) => [newEntry, ...(currentData || [])],
                    rollbackOnError: true,
                    revalidate: false,
                }
            )
            setInput('')
        } catch (error) {
            console.error('Failed to submit entry', error)
        }
    }

    return (
        <Wrapper>
            <h2>Guestbook</h2>
            {!session ? (
                <Button onClick={() => signIn('github')}>Sign in to sign</Button>
            ) : (
                <Form onSubmit={handleSubmit}>
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Sign the guestbook..."
                    />
                    <Button type="submit">Sign</Button>
                    <Button type="button" onClick={() => signOut()} style={{ background: 'transparent', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>Sign Out</Button>
                </Form>
            )}

            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    entries?.map((entry: any) => (
                        <div key={entry.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
                            <strong>{entry.createdBy}:</strong> {entry.body}
                        </div>
                    ))
                )}
            </div>
        </Wrapper>
    )
}
