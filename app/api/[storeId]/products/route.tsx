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

    const {
      name,
      images,
      price,
      categoryId,
      bodyTypeId,
      makeId,
      modelId,
      colorId,
      isArchived,
      isFeatured,
      mileage,
      year,
      fuel,
      gearbox,
      typeOfDrive,
    } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }
    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }
    if (!price) {
      return new NextResponse('Price is required', { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse('Category id is required', { status: 400 });
    }
    if (!colorId) {
      return new NextResponse('Color id  is required', { status: 400 });
    }
    if (!bodyTypeId) {
      return new NextResponse('Body Type id  is required', { status: 400 });
    }
    if (!makeId) {
      return new NextResponse('Make id  is required', { status: 400 });
    }
    if (!modelId) {
      return new NextResponse('Model id  is required', { status: 400 });
    }
    if (!mileage) {
      return new NextResponse('Mileage is required', { status: 400 });
    }
    if (!year) {
      return new NextResponse('Yea  is required', { status: 400 });
    }
    if (!fuel) {
      return new NextResponse('Fuel is required', { status: 400 });
    }
    if (!gearbox) {
      return new NextResponse('Gearbox is required', { status: 400 });
    }
    if (!typeOfDrive) {
      return new NextResponse('Type Of Drive is required', { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse('Images id  is required', { status: 400 });
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
    const product = await prismadb.product.create({
      data: {
        name,
        price,
        categoryId,
        bodyTypeId,
        makeId,
        modelId,
        colorId,
        isArchived,
        isFeatured,
        mileage,
        year,
        fuel,
        gearbox,
        typeOfDrive,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const bodyTypeId = searchParams.get('bodyTypeId') || undefined;
    const makeId = searchParams.get('makeId') || undefined;
    const modelId = searchParams.get('modelId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        bodyTypeId,
        makeId,
        modelId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        bodyType: true,
        make: true,
        model: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
