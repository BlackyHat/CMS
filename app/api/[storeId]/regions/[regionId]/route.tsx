import prismadb from '@/lib/prismadb';
import { UserRoles } from '@/types/enums';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { regionId: string } }
) {
  try {
    if (!params.regionId) {
      return new NextResponse('Region id is required', { status: 400 });
    }
    const region = await prismadb.region.findUnique({
      where: {
        id: params.regionId,
      },
    });

    return NextResponse.json(region);
  } catch (error) {
    console.log('[REGION_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; regionId: string } }
) {
  try {
    const { userId, sessionClaims } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }
    if (sessionClaims.role !== UserRoles.ADMIN) {
      return new NextResponse('Forbidden. Administrator rights are required.', {
        status: 403,
      });
    }

    if (!name) {
      return new NextResponse('Region name is required', { status: 400 });
    }
    if (!params.regionId) {
      return new NextResponse('Region id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }
    const region = await prismadb.region.updateMany({
      where: {
        id: params.regionId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(region);
  } catch (error) {
    console.log('[REGION_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; regionId: string } }
) {
  try {
    const { userId, sessionClaims } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }
    if (sessionClaims.role !== UserRoles.ADMIN) {
      return new NextResponse('Forbidden. Administrator rights are required.', {
        status: 403,
      });
    }

    if (!params.regionId) {
      return new NextResponse('Region id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }
    const region = await prismadb.region.deleteMany({
      where: {
        id: params.regionId,
      },
    });

    return NextResponse.json(region);
  } catch (error) {
    console.log('[REGION_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
