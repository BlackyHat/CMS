import prismadb from '@/lib/prismadb';
import { validateFields } from '@/utils/validateUtils';
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

    const product = await prismadb.product.create({
      data: {
        storeId: params.storeId,
        ownerId: userId,
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
          createMany: {
            data: [
              ...images.map((image: { url: string }, idx: number) => ({
                url: image.url,
                position: idx,
              })),
            ],
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
    const regionId = searchParams.get('regionId') || undefined;
    const cityId = searchParams.get('cityId') || undefined;
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
        regionId,
        cityId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: {
          select: {
            url: true,
          },
          orderBy: {
            position: 'asc',
          },
        },
        category: true,
        color: true,
        bodyType: true,
        make: true,
        model: true,
        region: true,
        city: true,
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
