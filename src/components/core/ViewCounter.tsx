'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { motion, useSpring, useTransform } from 'framer-motion'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const ViewCounter = ({ slug, trackView = false }: { slug: string; trackView?: boolean }) => {
    const { data, mutate } = useSWR(`/api/views/${slug}`, fetcher)

    useEffect(() => {
        if (trackView) {
            fetch(`/api/views/${slug}`, { method: 'POST' })
                .then((res) => res.json())
                .then((data) => {
                    mutate(data, false) // Update cache without revalidating immediately
                })
        }
    }, [slug, trackView, mutate])

    const count = data?.count || 0
    const spring = useSpring(count, { mass: 0.8, stiffness: 75, damping: 15 })

    useEffect(() => {
        spring.set(count)
    }, [count, spring])

    const display = useTransform(spring, (current) => Math.round(current).toLocaleString())

    return (
        <span style={{ fontFamily: 'var(--font-newsreader)', fontVariantNumeric: 'tabular-nums' }}>
            <motion.span>{display}</motion.span> views
        </span>
    )
}
