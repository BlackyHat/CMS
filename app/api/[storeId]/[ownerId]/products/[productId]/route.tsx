import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { productId: string; ownerId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 });
    }
    if (!params.ownerId) {
      return new NextResponse('Owner id is required', { status: 400 });
    }
    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
        ownerId: params.ownerId,
      },
      include: {
        images: true,
        category: true,
        color: true,
        bodyType: true,
        make: true,
        model: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[OWNER_PRODUCT_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: { params: { storeId: string; productId: string; ownerId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      colorId,
      bodyTypeId,
      makeId,
      modelId,
      images,
      mileage,
      year,
      fuel,
      gearbox,
      typeOfDrive,
      isArchived,
      isFeatured,
    } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }
    if (!params.ownerId) {
      return new NextResponse('Owner id is required', { status: 400 });
    }
    if (userId !== params.ownerId) {
      return new NextResponse('Unauthorized', { status: 403 });
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
    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }
    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        bodyTypeId,
        makeId,
        modelId,
        isArchived,
        isFeatured,
        mileage,
        year,
        fuel,
        gearbox,
        typeOfDrive,
        storeId: params.storeId,
        images: {
          deleteMany: {},
        },
      },
    });
    const product = await prismadb.product.update({
      where: {
        id: params.productId,
        ownerId: userId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[OWNER_PRODUCT_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: { params: { storeId: string; productId: string; ownerId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }
    if (!params.ownerId) {
      return new NextResponse('Owner id is required', { status: 400 });
    }
    if (userId !== params.ownerId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 });
    }
    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }
    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
        ownerId: userId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[OWNER_PRODUCT_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
