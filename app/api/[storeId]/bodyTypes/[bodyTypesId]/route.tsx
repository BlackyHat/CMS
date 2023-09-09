import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { bodyTypeId: string } }
) {
  try {
    if (!params.bodyTypeId) {
      return new NextResponse('Body Type id is required', { status: 400 });
    }
    const bodyType = await prismadb.bodyType.findUnique({
      where: {
        id: params.bodyTypeId,
      },
    });

    return NextResponse.json(bodyType);
  } catch (error) {
    console.log('[BODY_TYPE_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; bodyTypeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }
    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 });
    }
    if (!params.bodyTypeId) {
      return new NextResponse('Body Type id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }
    const bodyType = await prismadb.bodyType.updateMany({
      where: {
        id: params.bodyTypeId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(bodyType);
  } catch (error) {
    console.log('[BODY_TYPE_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; bodyTypeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }
    if (!params.bodyTypeId) {
      return new NextResponse('Body Type id is required', { status: 400 });
    }
    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }
    const bodyType = await prismadb.bodyType.deleteMany({
      where: {
        id: params.bodyTypeId,
      },
    });

    return NextResponse.json(bodyType);
  } catch (error) {
    console.log('[BODY_TYPE_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
