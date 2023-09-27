import prismadb from '@/lib/prismadb';
import { validateFields } from '@/utils/validateUtils';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 });
    }
    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        color: true,
        bodyType: true,
        make: true,
        model: true,
        region: true,
        city: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId, sessionClaims } = auth();
    const body = await req.json();

    const {
      ownerId,
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
      description,
      phone,
      regionId,
      cityId,
      engineSize,
      vinCode,
      headlights,
      spareTire,
      interiorMatherial,
      isCrashed,
      airConditioner,
      androidAuto,
      heatedSteeringWheel,
      electricWindows,
      electricSideMirrors,
      electricSeatAdjustment,
      isofix,
      navigationSystem,
      seatVentilation,
      seatHeating,
      soundSystem,
      sportSeats,
    } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }
    if (userId !== ownerId && sessionClaims.role !== UserRoles.ADMIN) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const requiredFields = [
      { value: params.storeId, fieldName: 'Store ID' },
      { value: name, fieldName: 'Name' },
      { value: price, fieldName: 'Price' },
      { value: categoryId, fieldName: 'Category id' },
      { value: bodyTypeId, fieldName: 'Body Type id' },
      { value: makeId, fieldName: 'Make id' },
      { value: modelId, fieldName: 'Model id' },
      { value: colorId, fieldName: 'Color id' },
      { value: mileage, fieldName: 'Mileage' },
      { value: year, fieldName: 'Year' },
      { value: fuel, fieldName: 'Fuel' },
      { value: gearbox, fieldName: 'Gearbox' },
      { value: typeOfDrive, fieldName: 'Type Of Drive' },
      { value: description, fieldName: 'Description' },
      { value: phone, fieldName: 'Phone' },
      { value: images, fieldName: 'Images' },
      { value: regionId, fieldName: 'Region' },
      { value: cityId, fieldName: 'City' },
    ];

    validateFields(requiredFields);

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
        description,
        phone,
        regionId,
        cityId,
        engineSize,
        vinCode,
        headlights,
        spareTire,
        interiorMatherial,
        isCrashed,
        airConditioner,
        androidAuto,
        heatedSteeringWheel,
        electricWindows,
        electricSideMirrors,
        electricSeatAdjustment,
        isofix,
        navigationSystem,
        seatVentilation,
        seatHeating,
        soundSystem,
        sportSeats,
        images: {
          deleteMany: {},
        },
      },
    });
    const product = await prismadb.product.update({
      where: {
        id: params.productId,
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
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId, sessionClaims } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
    });

    if (userId !== product?.ownerId && sessionClaims.role !== UserRoles.ADMIN) {
      return new NextResponse('Forbidden', { status: 403 });
    }
    await prismadb.product.delete({
      where: { id: params.productId },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
