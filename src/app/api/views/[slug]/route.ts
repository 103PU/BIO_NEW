import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug

  try {
    const view = await prisma.view.findUnique({
      where: { slug },
    })

    return NextResponse.json({ count: view?.count || 0 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch view count' }, { status: 500 })
  }
}

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug
  const ip = req.ip ?? '127.0.0.1' // Fallback for local dev

  // Simple IP hashing to prevent spam (in production use Redis or similar)
  // Here we just increment for now as per Phase 4 requirements which mentions caching but simpler implementation first
  try {
    const view = await prisma.view.upsert({
      where: { slug },
      create: { slug, count: 1 },
      update: { count: { increment: 1 } },
    })

    return NextResponse.json({ count: view.count })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to increment view count' }, { status: 500 })
  }
}
