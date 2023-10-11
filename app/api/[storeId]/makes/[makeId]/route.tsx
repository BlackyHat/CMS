import prismadb from '@/lib/prismadb';
import { UserRoles } from '@/types/enums';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { makeId: string } }
) {
  try {
    if (!params.makeId) {
      return new NextResponse('Make id is required', { status: 400 });
    }
    const make = await prismadb.make.findUnique({
      where: {
        id: params.makeId,
      },
    });

    return NextResponse.json(make);
  } catch (error) {
    console.log('[MAKE_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; makeId: string } }
) {
  try {
    const { userId, sessionClaims } = auth();
    const body = await req.json();

    const { label } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }
    if (sessionClaims.role !== UserRoles.ADMIN) {
      return new NextResponse('Forbidden. Administrator rights are required.', {
        status: 403,
      });
    }

    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }
    if (!params.makeId) {
      return new NextResponse('Make id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }
    const make = await prismadb.make.updateMany({
      where: {
        id: params.makeId,
      },
      data: {
        label,
      },
    });

    return NextResponse.json(make);
  } catch (error) {
    console.log('[MAKE_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; makeId: string } }
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

    if (!params.makeId) {
      return new NextResponse('Make id is required', { status: 400 });
    }
    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }
    const make = await prismadb.make.deleteMany({
      where: {
        id: params.makeId,
      },
    });

    return NextResponse.json(make);
  } catch (error) {
    console.log('[MAKE_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
