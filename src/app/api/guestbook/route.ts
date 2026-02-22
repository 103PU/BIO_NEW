import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const guestbookSchema = z.object({
  body: z.string().min(1).max(500),
})

export async function GET(req: NextRequest) {
  try {
    const entries = await prisma.guestbook.findMany({
      orderBy: { createdAt: 'desc' },
      where: { isApproved: true },
      select: {
        id: true,
        body: true,
        createdBy: true,
        createdAt: true,
      },
    })

    return NextResponse.json(entries.map((entry) => ({
      id: entry.id.toString(),
      body: entry.body,
      createdBy: entry.createdBy,
      createdAt: entry.createdAt.toISOString(),
    })))
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch guestbook' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { email, name } = session.user

  try {
    const json = await req.json()
    const body = guestbookSchema.parse(json)

    const entry = await prisma.guestbook.create({
      data: {
        email: email as string,
        body: body.body,
        createdBy: name as string,
      },
    })

    return NextResponse.json({
      id: entry.id.toString(),
      body: entry.body,
      createdBy: entry.createdBy,
      createdAt: entry.createdAt.toISOString(),
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 422 })
    }

    return NextResponse.json({ error: 'Failed to create entry' }, { status: 500 })
  }
}
