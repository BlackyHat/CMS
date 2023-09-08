import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }
    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse('Billboard id is required', { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }
    const bodyType = await prismadb.bodyType.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(bodyType);
  } catch (error) {
    console.log('[BODY_TYPES_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    const bodyTypes = await prismadb.bodyType.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(bodyTypes);
  } catch (error) {
    console.log('[[BODY_TYPES_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
