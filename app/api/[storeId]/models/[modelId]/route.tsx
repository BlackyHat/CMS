import prismadb from '@/lib/prismadb';
import { UserRoles } from '@/types/enums';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { modelId: string } }
) {
  try {
    if (!params.modelId) {
      return new NextResponse('Model id is required', { status: 400 });
    }
    const model = await prismadb.model.findUnique({
      where: {
        id: params.modelId,
      },
    });

    return NextResponse.json(model);
  } catch (error) {
    console.log('[MODEL_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; modelId: string } }
) {
  try {
    const { userId, sessionClaims } = auth();
    const body = await req.json();

    const { label, makeId } = body;

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
    if (!makeId) {
      return new NextResponse('Make id is required', { status: 400 });
    }
    if (!params.modelId) {
      return new NextResponse('Model id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }
    const model = await prismadb.model.updateMany({
      where: {
        id: params.modelId,
      },
      data: {
        label,
        makeId,
      },
    });

    return NextResponse.json(model);
  } catch (error) {
    console.log('[MODEL_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; modelId: string } }
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

    if (!params.modelId) {
      return new NextResponse('Model id is required', { status: 400 });
    }
    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }
    const model = await prismadb.model.deleteMany({
      where: {
        id: params.modelId,
      },
    });

    return NextResponse.json(model);
  } catch (error) {
    console.log('[MODEL_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
