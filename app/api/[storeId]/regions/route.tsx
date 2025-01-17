import prismadb from '@/lib/prismadb'
import { UserRoles } from '@/types/enums'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId, sessionClaims } = auth()
    const body = await req.json()

    const { name } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }
    if (sessionClaims.role !== UserRoles.ADMIN) {
      return new NextResponse('Forbidden. Administrator rights are required.', {
        status: 403,
      })
    }

    if (!name) {
      return new NextResponse('Region name is required', { status: 400 })
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    })

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }
    const region = await prismadb.region.create({
      data: {
        name,
      },
    })

    return NextResponse.json(region)
  } catch (error) {
    console.log('[REGION_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 })
    }

    const regions = await prismadb.region.findMany({
      include: { cities: { orderBy: { name: 'asc' } } },
      orderBy: {
        updatedAt: 'asc',
      },
    })

    return NextResponse.json(regions)
  } catch (error) {
    console.log('[REGIONS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
